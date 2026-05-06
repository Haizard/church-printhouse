import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageSource = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

const localImageIdentifiers = Array.from(
  pageSource.matchAll(/import\s+(\w+)\s+from\s+"@\/images\/[^"]+";/g),
  ([, identifier]) => identifier
);

const heroSlidesBlockMatch = pageSource.match(/const heroSlides = \[[\s\S]*?\];/);
assert.ok(heroSlidesBlockMatch, "Expected the homepage source to define heroSlides.");
const heroSlidesBlock = heroSlidesBlockMatch[0];
const sourceAfterHeroSlides = pageSource.slice(heroSlidesBlockMatch.index + heroSlidesBlock.length);

function getSectionRanges(source) {
  const ranges = [];
  const sectionPattern = /<section\b[\s\S]*?<\/section>/g;

  for (const match of source.matchAll(sectionPattern)) {
    ranges.push({
      start: match.index,
      end: match.index + match[0].length,
      content: match[0],
    });
  }

  return ranges;
}

test("homepage places a non-content section between events and sermons/blog", () => {
  const eventsIndex = pageSource.indexOf('title="Matukio Yajayo"');
  const sermonsIndex = pageSource.indexOf('title="Mahubiri ya Karibuni"');
  const blogIndex = pageSource.indexOf('title="Blogu Yetu"');

  assert.notStrictEqual(eventsIndex, -1, 'Expected to find the events section title "Matukio Yajayo".');
  assert.notStrictEqual(sermonsIndex, -1, 'Expected to find the sermons section title "Mahubiri ya Karibuni".');
  assert.notStrictEqual(blogIndex, -1, 'Expected to find the blog section title "Blogu Yetu".');

  const sections = getSectionRanges(pageSource);
  const separatorSection = sections.find((section) => {
    const isBetweenEventsAndSermons = eventsIndex < section.start && section.end < sermonsIndex;
    const hasSectionHeader = section.content.includes("SectionHeader");
    const usesLocalImage = localImageIdentifiers.some((identifier) => section.content.includes(identifier));

    return isBetweenEventsAndSermons && !hasSectionHeader && usesLocalImage;
  });

  assert.ok(
    separatorSection && sermonsIndex < blogIndex,
    "Expected homepage source order to place events before a non-content local-image section, then sermons, then blog."
  );
});

test("homepage uses local image-backed sections beyond the hero", () => {
  assert.ok(localImageIdentifiers.length > 0, "Expected the homepage to import at least one local image asset.");

  const heroImageIdentifiers = localImageIdentifiers.filter((identifier) => heroSlidesBlock.includes(identifier));
  const localImageUsedOutsideHero = heroImageIdentifiers.some((identifier) => sourceAfterHeroSlides.includes(identifier));

  assert.ok(
    localImageUsedOutsideHero,
    "Expected at least one imported local image to be used outside the hero carousel."
  );
});
