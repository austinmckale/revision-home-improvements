import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import * as zod from "zod";

const source = readFileSync(new URL("../src/lib/quoteSchema.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const exports = {};

// Evaluate the real shared schema with its installed Zod dependency. This test
// does not load the API route, read credentials, or make delivery requests.
vm.runInNewContext(compiled, {
  exports,
  require(name) {
    assert.equal(name, "zod");
    return zod;
  },
});
const { quoteContactSchema, quoteSchema } = exports;

const request = {
  name: "Sample Customer",
  email: "homeowner@example.test",
  service: "Kitchen Remodeling",
  city: "Allentown",
  zip: "18101",
  timeline: "Exploring options",
  details: "Replace kitchen cabinets and counters.",
  website: "",
};
const accepted = ["555-0100", "(610) 555-0100", "+1 (610) 555-0100", "+123 456 789 012 345", "  (610) 555-0100  "];
const rejected = [
  "-------",
  "+().   ",
  "123456",
  "1234567890123456",
  "610 555 CALL",
  " ",
  "+1        (610)       555-0100",
];

for (const [label, schema] of [
  ["Contact step", quoteContactSchema],
  ["Quote API", quoteSchema],
]) {
  for (const phone of accepted) {
    const result = schema.safeParse({ ...request, phone });
    assert.equal(result.success, true, `${label} should accept ${JSON.stringify(phone)}`);
    assert.equal(result.data.phone, phone.trim(), `${label} should trim surrounding whitespace`);
  }
  for (const phone of rejected) {
    const result = schema.safeParse({ ...request, phone });
    assert.equal(result.success, false, `${label} should reject ${JSON.stringify(phone)}`);
    assert.ok(result.error.flatten().fieldErrors.phone?.length, `${label} should explain the phone error`);
  }
}

console.log("Quote validation passed: 24 browser/API phone checks, with no lead delivery calls.");
