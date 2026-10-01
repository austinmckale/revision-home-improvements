import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as jsxRuntime from "react/jsx-runtime";
import ts from "typescript";

const source = readFileSync(new URL("../src/components/forms/QuoteForm.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    jsx: ts.JsxEmit.ReactJSX,
    esModuleInterop: true,
  },
}).outputText;
const phone = { phoneHref: "tel:+16105550100", phoneDisplay: "(610) 555-0100" };

function loadForm(react = React) {
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      if (name === "react") return react;
      if (name === "react/jsx-runtime") return jsxRuntime;
      if (name === "next/link") return { __esModule: true, default: (props) => React.createElement("a", props) };
      if (name === "@/content/services")
        return { primaryServices: [{ slug: "kitchen-remodeling", name: "Kitchen Remodeling" }] };
      if (name === "@/content/site") return { siteConfig: phone };
      if (name === "@/lib/leadAttribution")
        return {
          getFirstTouchAttribution: () => {
            throw new Error("SSR must not read browser attribution");
          },
        };
      if (name === "@/lib/quoteSchema") return {};
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return exports.default;
}

const html = renderToStaticMarkup(React.createElement(loadForm(), { defaultService: "kitchen-remodeling" }));

test("real React SSR disables all quote data controls and the submit action before hydration", () => {
  const controls = [...html.matchAll(/<(?:input|select|textarea)\b[^>]*>/g)].map(([tag]) => tag);
  assert.equal(controls.length, 5, "name, phone, email, service and honeypot render in step one");
  controls.forEach((tag) => assert.match(tag, /\bdisabled=""/, tag));
  assert.match(html, /<button\b[^>]*type="submit"[^>]*disabled=""/);
});

test("native fallback uses POST and never puts quote fields in a GET URL", () => {
  const form = html.match(/<form\b[^>]*>/)[0];
  assert.match(form, /\bmethod="post"/);
  assert.match(form, /\baction="\/api\/quote"/);
});

test("server HTML supplies an actionable phone fallback and explains the no-JavaScript limitation", () => {
  assert.match(html, /href="tel:\+16105550100"/);
  assert.match(html, /<noscript>[\s\S]*This form needs JavaScript to send a request\.[\s\S]*<\/noscript>/);
});

function findElements(node, predicate, result = []) {
  if (Array.isArray(node)) node.forEach((child) => findElements(child, predicate, result));
  else if (node && typeof node === "object") {
    if (predicate(node)) result.push(node);
    findElements(node.props?.children, predicate, result);
  }
  return result;
}

function clientForm(ready) {
  const hooks = {
    useState: (initial) => [initial, () => {}],
    useRef: (initial) => ({ current: initial }),
    useEffect: () => {},
    useId: () => "readiness-fixture",
    useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot) {
      assert.equal(serverSnapshot(), false);
      assert.equal(clientSnapshot(), true);
      return ready;
    },
  };
  return loadForm(hooks)({ defaultService: "kitchen-remodeling" });
}

test("the pre-hydration submit handler cannot advance or attempt a request", async () => {
  const form = clientForm(false);
  let prevented = false;
  await form.props.onSubmit({
    preventDefault: () => {
      prevented = true;
    },
  });
  assert.equal(prevented, true);
  assert.equal(form.props["aria-busy"], true);
});

test("hydration readiness enables the existing required inputs and Continue action", () => {
  const form = clientForm(true);
  const controls = findElements(form, (node) => ["input", "select", "textarea"].includes(node.type));
  controls.forEach((node) => assert.equal(node.props.disabled, false));
  controls.filter((node) => node.props.name !== "website").forEach((node) => assert.equal(node.props.required, true));
  const submit = findElements(form, (node) => node.type === "button" && node.props.type === "submit")[0];
  assert.equal(submit.props.disabled, false);
  assert.equal(form.props["aria-busy"], false);
  assert(!findElements(form, (node) => node.props?.role === "status").length);
});
