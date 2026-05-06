import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("carousel viewport preserves full-height layouts", () => {
  const source = readFileSync(new URL("../src/components/ui/carousel.tsx", import.meta.url), "utf8");

  assert.match(
    source,
    /className=(?:\{cn\()?\"(?:h-full overflow-hidden|overflow-hidden h-full)\"/,
    "Expected the carousel viewport wrapper to include h-full so hero slides with absolutely positioned content stay visible."
  );
});
