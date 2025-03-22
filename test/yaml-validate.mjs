// BUSINESS RULE:
//
// - All pages (.md, .html) in ./source/ must include a front matter at the top of the file:
//   - Has `title`, `description`, `keywords` keys
//   - Has `required_reviews` key with a value of `none`, `aha`, or `medical`
//      - If other than `none`, then:
//        - Has `writer` or `reviewer` keys
//          - If `writer`, then has `written` date and [TODO:] `writerQualifications`
//          - If `reviewer`, then has `reviewed` date
//        - Has `lastUpdated` date
//        - (Warning) If
//
// - Exception:
//   - source/_includes, source/_layouts, source/_medical-news, no rules apply (they are not full pages)

import { glob } from "glob";
import fs from "fs";
import yaml from "js-yaml";

const targets = glob.sync("source/**/*.{md,html}").sort();
const exemptions = ["source/_includes", "source/_layouts", "source/_medical-news", "source/README.md"];

let allTestsPassed = true;

console.log("🧪 Validating page YAML front matter 🧪");

for (const target of targets) {
  if (exemptions.some((exempt) => target.startsWith(exempt))) {
    continue;
  }

  const file = fs.readFileSync(target, "utf8");
  const frontMatter = file.match(/---\n([\s\S]*?)\n---/);
  if (!frontMatter) {
    console.error(`❌ ${target} is missing front matter`);
    allTestsPassed = false;
    continue;
  }

  try {
    const data = yaml.load(frontMatter[1]);

    // Basic requirements
    if (!data.title) {
      console.error(`❌ ${target} front matter is missing a title`);
      allTestsPassed = false;
    }
    if (!data.description) {
      console.error(`❌ ${target} front matter is missing a description`);
      allTestsPassed = false;
    }
    if (!data.required_reviews) {
      console.error(`❌ ${target} front matter is missing required_reviews`);
      allTestsPassed = false;
    }
    if (!["none", "aha", "medical"].includes(data.required_reviews)) {
      console.error(`❌ ${target} front matter required_reviews is invalid`);
      allTestsPassed = false;
    }

    // Medical, AHA requirements
    if (data.required_reviews !== "none") {
      if (!data.writer && !data.reviewer) {
        console.error(
          `❌ ${target} front matter is missing writer or reviewer (when required_reviews is ${data.required_reviews})`,
        );
        allTestsPassed = false;
      }
      if (data.writer && !data.written) {
        console.error(`❌ ${target} front matter is missing written (when writer is present)`);
        allTestsPassed = false;
      }
      // TODO:
      /*
      if (data.writer && !data.writerQualifications) {
        console.error(
          `⚠️  ${target} front matter is missing writerQualifications (when required_reviews is ${data.required_reviews}) and writer is present`,
        );
      }
      */
      if (data.reviewer && !data.reviewed) {
        console.error(`❌ ${target} front matter is missing reviewed (when reviewer is present)`);
        allTestsPassed = false;
      }
      if (!data.lastUpdated) {
        console.error(
          `❌ ${target} front matter is missing lastUpdated (when required_reviews is ${data.required_reviews})`,
        );
        allTestsPassed = false;
      }
    }
  } catch (error) {
    console.error(`❌ ${target} front matter is invalid YAML`);
    allTestsPassed = false;
  }
}

if (allTestsPassed) {
  console.log("✨ Passed ✨");
}
console.log("");
if (!allTestsPassed) {
  process.exit(1);
}
