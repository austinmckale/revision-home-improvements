import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import { EventEmitter } from "node:events";
import { createRequire } from "node:module";
import ts from "typescript";
import * as zod from "zod";

function compile(path) {
  return ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
}

const schemaExports = {};
vm.runInNewContext(compile("../src/lib/quoteSchema.ts"), {
  exports: schemaExports,
  require(name) {
    assert.equal(name, "zod");
    return zod;
  },
});
const compiledRoute = compile("../src/app/api/quote/route.ts");
const lead = {
  name: "Sample Customer",
  phone: "(610) 555-0100",
  email: "homeowner@example.test",
  service: "Kitchen Remodeling",
  city: "Allentown",
  zip: "18101",
  timeline: "Exploring options",
  details: "Replace kitchen cabinets and counters.",
  website: "",
};
const phoneDisplay = "(484) 706-9229";
const providerPrivateText = "provider-private-response-do-not-expose";

// Run the actual route in an isolated VM. Environment, fetch, SMTP, Manager,
// and NextResponse are mocked; this never reads credentials or contacts a server.
function route({
  webhook = "unconfigured",
  email = "unconfigured",
  manager = "unconfigured",
  facebook = "unconfigured",
  schema = schemaExports.quoteSchema,
  smtpPort = 465,
  schedulerThrows = false,
} = {}) {
  const calls = { fetch: [], mail: [], manager: [], transports: [], sockets: [], closes: 0, logs: [], after: [] };
  const timers = new Set();
  const env = {};
  if (webhook !== "unconfigured") env.LEADS_WEBHOOK_URL = "https://webhook.example.test/leads";
  if (email !== "unconfigured") {
    Object.assign(env, {
      SMTP_HOST: "smtp.example.test",
      SMTP_USER: "sender@example.test",
      SMTP_PASS: "synthetic-test-password",
      SMTP_PORT: String(smtpPort),
    });
  }
  if (facebook !== "unconfigured") {
    Object.assign(env, { NEXT_PUBLIC_FB_PIXEL_ID: "test-pixel", FB_CONVERSIONS_API_TOKEN: "synthetic-test-token" });
  }
  const exports = {};
  vm.runInNewContext(compiledRoute, {
    exports,
    process: { env },
    AbortController,
    setTimeout(callback, delay) {
      const timer = setTimeout(
        () => {
          timers.delete(timer);
          callback();
        },
        Math.min(delay, 10),
      );
      timers.add(timer);
      return timer;
    },
    clearTimeout(timer) {
      timers.delete(timer);
      clearTimeout(timer);
    },
    console: Object.fromEntries(
      ["log", "warn", "error"].map((level) => [level, (...values) => calls.logs.push({ level, values })]),
    ),
    async fetch(url, options) {
      calls.fetch.push({ url, options });
      const mode = url.includes("graph.facebook.com") ? facebook : webhook;
      if (mode === "hang")
        return new Promise((resolve, reject) => {
          options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true });
        });
      if (mode === "throw") throw new Error(providerPrivateText);
      return { ok: mode === "success", status: mode === "success" ? 200 : 502, text: async () => providerPrivateText };
    },
    require(name) {
      if (name === "next/server")
        return {
          NextResponse: { json: (body, options = {}) => ({ status: options.status ?? 200, json: async () => body }) },
          after(callback) {
            if (schedulerThrows) throw new Error("Synthetic scheduling failure");
            calls.after.push(callback);
          },
        };
      if (name === "node:net")
        return {
          createConnection(options) {
            const socket = new EventEmitter();
            socket.options = options;
            socket.destroyed = false;
            const onAbort = () => socket.destroy(options.signal.reason);
            options.signal.addEventListener("abort", onAbort, { once: true });
            socket.destroy = (error) => {
              socket.destroyed = true;
              options.signal.removeEventListener("abort", onAbort);
              if (error) socket.emit("error", error);
              return socket;
            };
            calls.sockets.push(socket);
            if (email !== "dns-hang") queueMicrotask(() => socket.emit("connect"));
            return socket;
          },
        };
      if (name === "nodemailer")
        return {
          createTransport(options) {
            calls.transports.push(options);
            return {
              sendMail(payload) {
                calls.mail.push(payload);
                return new Promise((resolve, reject) => {
                  options.getSocket(options, (error, socketOptions) => {
                    if (error) return reject(error);
                    // A raw socket retains Nodemailer's TLS negotiation. It must
                    // never be incorrectly marked as already secured.
                    assert.equal(socketOptions.secured, undefined);
                    const socket = socketOptions.connection;
                    assert.equal(socket, calls.sockets.at(-1));
                    if (email === "hang") socket.once("error", reject);
                    else if (email === "success") resolve({ accepted: ["quotes@example.test"] });
                    else reject(new Error(providerPrivateText));
                  });
                });
              },
              close: () => calls.closes++,
            };
          },
        };
      if (name === "@/lib/leadIntake")
        return {
          async forwardToManagerAppLead(payload, signal) {
            calls.manager.push(payload);
            if (manager === "hang")
              return new Promise((resolve, reject) => {
                signal.addEventListener("abort", () => reject(signal.reason), { once: true });
              });
            if (manager === "throw") throw new Error(providerPrivateText);
            if (manager === "success") return { forwarded: true, status: 201, leadId: "test-lead" };
            if (manager === "failure")
              return { forwarded: false, reason: "non_2xx", status: 502, responseText: providerPrivateText };
            return { forwarded: false, reason: "missing_api_key" };
          },
        };
      if (name === "@/content/site") return { siteConfig: { primaryEmail: "quotes@example.test", phoneDisplay } };
      if (name === "@/lib/quoteSchema") return { quoteSchema: schema };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  async function submit(body = lead, ip = "192.0.2.1") {
    return exports.POST(
      new Request("https://site.example.test/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": ip, "user-agent": "Lead delivery test" },
        body: JSON.stringify(body),
      }),
    );
  }
  const runAfter = async () => {
    const callbacks = calls.after.splice(0);
    await Promise.all(callbacks.map((callback) => callback()));
  };
  return { submit, calls, runAfter, timers, POST: exports.POST };
}

async function assertUnavailable(api) {
  const response = await api.submit();
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.ok, false);
  assert.match(body.message, new RegExp(phoneDisplay.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert(!JSON.stringify(body).includes(providerPrivateText));
  const logs = JSON.stringify(api.calls.logs);
  assert(!logs.includes(providerPrivateText));
  assert(!logs.includes(lead.email));
  assert(!logs.includes(lead.phone));
  assert(!logs.includes("synthetic-test-password"));
  assert(!logs.includes("synthetic-test-token"));
}

test("unconfigured delivery channels return503 and log skipped acknowledgements honestly", async () => {
  const api = route();
  await assertUnavailable(api);
  assert.equal(api.calls.fetch.length, 0);
  assert.equal(api.calls.mail.length, 0);
  const outcomes = api.calls.logs.flatMap((log) => log.values).filter((value) => value?.outcome);
  assert.equal(outcomes.length, 3);
  assert(outcomes.every((result) => result.outcome === "skipped"));
});

test("all configured delivery failures return503 without private provider response text", async () => {
  const api = route({ webhook: "failure", email: "failure", manager: "failure", facebook: "failure" });
  await assertUnavailable(api);
  assert.equal(api.calls.fetch.length, 1);
  assert.equal(api.calls.mail.length, 1);
  assert.equal(api.calls.manager.length, 1);
});

test("network exceptions cannot produce a success acknowledgement", async () => {
  await assertUnavailable(route({ webhook: "throw", email: "failure", manager: "throw", facebook: "throw" }));
});

test("Facebook analytics is not started without an acknowledged contact delivery", async () => {
  const api = route({ facebook: "success" });
  await assertUnavailable(api);
  assert.equal(api.calls.fetch.length, 0);
  assert.equal(api.calls.after.length, 0);
});

for (const channel of ["webhook", "email", "manager"]) {
  test(`${channel} alone can acknowledge real contact delivery`, async () => {
    const api = route({ [channel]: "success" });
    const response = await api.submit();
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    if (channel === "manager") {
      assert.equal(api.calls.manager[0].contactName, lead.name);
      assert.equal(api.calls.manager[0].city, lead.city);
      assert.equal(api.calls.manager[0].serviceType, lead.service);
    }
  });
}

test("partial contact/analytics failure retains success when a contact channel acknowledged", async () => {
  const api = route({ webhook: "failure", email: "success", manager: "failure", facebook: "failure" });
  const response = await api.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  await api.runAfter();
  assert.equal(api.calls.fetch.length, 2);
  assert.equal(api.calls.mail.length, 1);
  assert.equal(api.calls.manager.length, 1);
});

test("all real channels can receive the same valid request", async () => {
  const api = route({ webhook: "success", email: "success", manager: "success", facebook: "success" });
  const response = await api.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  await api.runAfter();
  assert.equal(api.calls.fetch.length, 2);
  assert.equal(api.calls.mail.length, 1);
  assert.equal(api.calls.manager.length, 1);
  assert.equal(JSON.parse(api.calls.fetch[0].options.body).lead.name, lead.name);
  assert.equal(api.calls.mail[0].replyTo, lead.email);
});

test("invalid actual schema input returns400 with field errors and no deliveries", async () => {
  const api = route({ webhook: "success", email: "success", manager: "success" });
  const response = await api.submit({ ...lead, phone: "-------" });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.ok, false);
  assert(body.errors.phone.length);
  assert.equal(api.calls.fetch.length + api.calls.mail.length + api.calls.manager.length, 0);
});

test("existing schema rejects a populated honeypot before attempting deliveries", async () => {
  const api = route();
  const response = await api.submit({ ...lead, website: "https://bot.example.test" });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).ok, false);
  assert.equal(api.calls.fetch.length + api.calls.mail.length + api.calls.manager.length, 0);
});

test("isolated honeypot decoy branch remains a no-delivery acknowledgement", async () => {
  // The current production schema rejects nonempty website values. Isolate the
  // already-present decoy branch without changing that validation contract.
  const api = route({ schema: { safeParse: (data) => ({ success: true, data }) } });
  const response = await api.submit({ ...lead, website: "bot" });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(api.calls.fetch.length + api.calls.mail.length + api.calls.manager.length, 0);
});

test("existing rate limit returns429 before a ninth delivery from the same IP", async () => {
  const api = route({ manager: "success" });
  for (let index = 0; index < 8; index++) assert.equal((await api.submit()).status, 200);
  const response = await api.submit();
  assert.equal(response.status, 429);
  assert.equal((await response.json()).ok, false);
  assert.equal(api.calls.manager.length, 8);
});

test("malformed JSON retains500 generic fallback without attempting a delivery", async () => {
  const api = route();
  const response = await api.POST({
    json: async () => {
      throw new Error(providerPrivateText);
    },
  });
  const body = await response.json();
  assert.equal(response.status, 500);
  assert.equal(body.ok, false);
  assert(!JSON.stringify(body).includes(providerPrivateText));
  assert.equal(api.calls.fetch.length + api.calls.mail.length + api.calls.manager.length, 0);
});

test("a stalled analytics request cannot delay an acknowledged response and is aborted after response", async () => {
  const api = route({ manager: "success", facebook: "hang" });
  const response = await api.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(api.calls.fetch.length, 0, "analytics starts only in the framework-owned after callback");
  assert.equal(api.calls.after.length, 1);
  await api.runAfter();
  assert.equal(api.calls.fetch.length, 1);
  assert.equal(api.calls.fetch[0].options.signal.aborted, true);
  assert.equal(api.timers.size, 0);
  assert(
    api.calls.logs.some((log) =>
      log.values.some((value) => value?.channel === "Facebook conversion (analytics)" && value.outcome === "failed"),
    ),
  );
});

test("a post-response scheduling exception cannot reverse contact acknowledgement", async () => {
  const api = route({ manager: "success", facebook: "success", schedulerThrows: true });
  const response = await api.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(api.calls.fetch.length, 0);
  assert.equal(api.timers.size, 0);
});

test("all stalled contact channels are cancelled, cleaned up, and return503 without analytics", async () => {
  const api = route({ webhook: "hang", email: "hang", manager: "hang", facebook: "success" });
  await assertUnavailable(api);
  assert.equal(api.calls.fetch[0].options.signal.aborted, true);
  assert.equal(api.calls.sockets[0].options.signal.aborted, true);
  assert.equal(api.calls.sockets[0].destroyed, true);
  assert.equal(api.calls.closes, 1);
  assert.equal(api.calls.after.length, 0);
  assert.equal(api.timers.size, 0);
});

test("a slow failing contact channel cannot erase another channel's real acknowledgement", async () => {
  const api = route({ webhook: "hang", manager: "success" });
  const response = await api.submit();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(api.calls.fetch[0].options.signal.aborted, true);
  assert.equal(api.timers.size, 0);
});

for (const smtpPort of [465, 587]) {
  test(`SMTP ${smtpPort} retains auth and TLS mode, uses a raw socket, and cleans up after acknowledgement`, async () => {
    const api = route({ email: "success", smtpPort });
    const response = await api.submit();
    assert.equal(response.status, 200);
    const transport = api.calls.transports[0];
    assert.equal(transport.host, "smtp.example.test");
    assert.equal(transport.port, smtpPort);
    assert.equal(transport.secure, smtpPort === 465);
    assert.equal(transport.auth.user, "sender@example.test");
    assert.equal(transport.auth.pass, "synthetic-test-password");
    assert.equal(transport.dnsTimeout, 8_000);
    assert.equal(transport.connectionTimeout, 8_000);
    assert.equal(transport.greetingTimeout, 8_000);
    assert.equal(transport.socketTimeout, 8_000);
    assert.equal(api.calls.sockets[0].options.host, transport.host);
    assert.equal(api.calls.sockets[0].options.port, smtpPort);
    assert.equal(api.calls.sockets[0].destroyed, true);
    assert.equal(api.calls.closes, 1);
    assert.equal(api.timers.size, 0);
  });
}

test("SMTP cancellation before connection does not send a message or leave a transport open", async () => {
  const api = route({ email: "dns-hang" });
  await assertUnavailable(api);
  assert.equal(api.calls.sockets[0].options.signal.aborted, true);
  assert.equal(api.calls.sockets[0].destroyed, true);
  assert.equal(api.calls.closes, 1);
  assert.equal(api.timers.size, 0);
});

const compiledManager = compile("../src/lib/leadIntake.ts");
function managerHelper(fetch) {
  const exports = {};
  vm.runInNewContext(compiledManager, {
    exports,
    process: { env: { LEAD_INGEST_API_KEY: "synthetic-test-key", MANAGER_APP_URL: "https://manager.example.test" } },
    crypto: { randomUUID: () => "fixture-manager-reference" },
    setTimeout,
    clearTimeout,
    fetch,
  });
  return exports.forwardToManagerAppLead;
}

test("the actual Manager helper passes cancellation to fetch and never retries an aborted request", async () => {
  const controller = new AbortController();
  let count = 0;
  const forward = managerHelper(async (url, options) => {
    count++;
    assert.equal(options.signal, controller.signal);
    return new Promise((resolve, reject) => {
      options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true });
    });
  });
  const pending = forward({ contactName: lead.name, source: "website_form" }, controller.signal);
  controller.abort(new Error("Synthetic deadline"));
  assert.equal((await pending).forwarded, false);
  assert.equal(count, 1);
});

test("the actual Manager helper cancels its retry pause without issuing a second request", async () => {
  const controller = new AbortController();
  let count = 0;
  const forward = managerHelper(async () => {
    count++;
    return { ok: false, status: 503, text: async () => "Synthetic failure" };
  });
  const pending = forward({ source: "website_form" }, controller.signal);
  // Let the initial response enter the retry pause before canceling it.
  await new Promise((resolve) => setImmediate(resolve));
  controller.abort();
  assert.equal((await pending).forwarded, false);
  assert.equal(count, 1);
});

test("the actual Manager helper never acknowledges or retries a cancelled response-body read", async () => {
  const controller = new AbortController();
  let count = 0;
  const forward = managerHelper(async (url, options) => {
    count++;
    return {
      ok: true,
      status: 201,
      text: () =>
        new Promise((resolve, reject) => {
          options.signal.addEventListener("abort", () => reject(options.signal.reason), { once: true });
        }),
    };
  });
  const pending = forward({ source: "website_form" }, controller.signal);
  await new Promise((resolve) => setImmediate(resolve));
  controller.abort(new Error("Synthetic response-body deadline"));
  assert.equal((await pending).forwarded, false);
  assert.equal(count, 1);
});

test("existing Manager callers without a signal retain successful forwarding", async () => {
  const forward = managerHelper(async (url, options) => {
    assert.equal(options.signal, undefined);
    assert.equal(JSON.parse(options.body).source, "google_ads_lead_form");
    return { ok: true, status: 201, text: async () => JSON.stringify({ leadId: "fixture-lead" }) };
  });
  assert.equal((await forward({ source: "google_ads_lead_form" })).forwarded, true);
});

for (const secure of [true, false]) {
  test(`installed Nodemailer retains ${secure ? "implicit TLS" : "STARTTLS"} on a supplied raw socket and closes on socket error`, () => {
    // Exercise the installed SMTPConnection with fake sockets/TLS. This proves
    // the getSocket contract does not bypass TLS; it performs no DNS or IO.
    const require = createRequire(import.meta.url);
    const smtpPath = require.resolve("nodemailer/lib/smtp-connection");
    const smtpRequire = createRequire(smtpPath);
    const immediate = [];
    const tlsCalls = [];
    const fakeSocket = () => {
      const socket = new EventEmitter();
      socket.setTimeout = () => socket;
      socket.resume = () => socket;
      socket.write = () => true;
      socket.destroyed = false;
      socket.destroy = () => {
        socket.destroyed = true;
        return socket;
      };
      socket.end = () => {
        socket.ended = true;
        return socket;
      };
      return socket;
    };
    const rawSocket = fakeSocket();
    const tlsSocket = fakeSocket();
    const smtpModule = { exports: {} };
    vm.runInNewContext(readFileSync(smtpPath, "utf8"), {
      module: smtpModule,
      exports: smtpModule.exports,
      Buffer,
      setImmediate: (callback) => immediate.push(callback),
      setTimeout: () => ({ unref() {} }),
      clearTimeout() {},
      require(name) {
        if (name === "tls")
          return {
            connect: (options) => {
              tlsCalls.push(options);
              return tlsSocket;
            },
          };
        if (name === "net")
          return {
            isIP: () => 0,
            connect: () => {
              throw new Error("No real socket connection allowed");
            },
          };
        return smtpRequire(name);
      },
    });
    const connection = new smtpModule.exports({
      host: "smtp.example.test",
      port: secure ? 465 : 587,
      secure,
      connection: rawSocket,
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 8_000,
    });
    const errors = [];
    let ended = 0;
    connection.on("error", (error) => errors.push(error));
    connection.on("end", () => ended++);
    connection.connect(() => {});
    immediate.splice(0).forEach((callback) => callback());
    if (!secure) {
      assert.equal(tlsCalls.length, 0, "STARTTLS begins only after the SMTP server permits the upgrade");
      connection._actionSTARTTLS("220 Ready to start TLS");
    }
    assert.equal(tlsCalls.length, 1);
    assert.equal(tlsCalls[0].socket, rawSocket);
    assert.equal(tlsCalls[0].servername, "smtp.example.test");
    assert.notEqual(tlsCalls[0].rejectUnauthorized, false);
    rawSocket.emit("error", new Error("Synthetic cancellation"));
    assert.equal(errors.length, 1);
    assert(tlsSocket.destroyed || tlsSocket.ended, "the secured socket must be closed or ended");
    assert.equal(ended, 1, "the SMTP client must emit its terminal end event");
  });
}
