import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageSource = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

test("homepage places a non-content section between events and sermons/blog", () => {
  const eventsIndex = pageSource.indexOf('title="Matukio Yajayo"');
  const worshipIndex = pageSource.indexOf("Jiunge Nasi Katika Ibada");
  const sermonsIndex = pageSource.indexOf('title="Mahubiri ya Karibuni"');
  const blogIndex = pageSource.indexOf('title="Blogu Yetu"');

  assert.notStrictEqual(eventsIndex, -1, 'Expected to find the events section title "Matukio Yajayo".');
  assert.notStrictEqual(worshipIndex, -1, 'Expected to find the non-content worship section copy "Jiunge Nasi Katika Ibada".');
  assert.notStrictEqual(sermonsIndex, -1, 'Expected to find the sermons section title "Mahubiri ya Karibuni".');
  assert.notStrictEqual(blogIndex, -1, 'Expected to find the blog section title "Blogu Yetu".');

  assert.ok(
    eventsIndex < worshipIndex && worshipIndex < sermonsIndex && sermonsIndex < blogIndex,
    "Expected homepage source order to place events before the worship section, then sermons, then blog."
  );
});

test("homepage uses local image-backed sections beyond the hero", () => {
  assert.match(
    pageSource,
    /section-image-shell|image-story-panel|community-mosaic/,
    "Expected the homepage to include a local image-backed section class beyond the hero."
  );
});
