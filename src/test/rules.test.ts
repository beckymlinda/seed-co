import { describe, expect, it } from "vitest";
import { rules, getRule } from "@/lib/rules";

describe("rules", () => {
  it("includes only rules 1 to 15", () => {
    expect(rules.map((r) => r.number)).toEqual(Array.from({ length: 15 }, (_, i) => i + 1));
    expect(getRule(16)).toBeUndefined();
  });
});
