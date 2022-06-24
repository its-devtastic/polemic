import { citeBracketRe, citeKeyRe } from "./regex";
import { LOCATORS } from "./constants";

/**
 * Parses a given citation string and return properties and entries required for cite-proc.
 * Adapted from https://github.com/timlrx/rehype-citation/blob/main/src/parse-citation.js
 */
export const parseCitation = (
  citeString: string
): [any, Record<string, any>[]] => {
  let entries: Record<string, any>[] = [];
  let properties;
  if (citeBracketRe.test(citeString)) {
    properties = { noteIndex: 0 };
    // Handle citations in the form of [@item1; @item2]
    const citeItems = citeString.substring(1, citeString.length - 1).split(";");
    for (const citeItem of citeItems) {
      // Prefix is the portion before @ e.g. [see @item1] or an empty string
      let prefix = "";
      let locator = "";
      let label = "page";
      let suffix = "";
      const citeChunk = citeItem.split("@");
      if (citeChunk.length === 1) {
        throw new Error("Cite key should be in the form of @key");
      } else if (citeChunk.length > 2) {
        throw new Error(
          "More than one cite key @ detected, please separate keys with ;"
        );
      }
      prefix += citeChunk[0];
      prefix = prefix.trim();

      // If [-@item1], suppress author
      let suppressAuthor =
        citeItem.indexOf("@") > 0 &&
        citeItem[citeItem.indexOf("@") - 1] === "-";
      if (suppressAuthor) {
        prefix = prefix.substring(0, prefix.length - 1).trim();
      }

      // The citation key can be terminated with a comma or space
      let commaIndex: number | undefined = citeChunk[1].indexOf(",") + 1;
      // If the commaIndex is 0, this means there was no comma - check for space
      if (commaIndex === 0) {
        commaIndex = citeChunk[1].indexOf(" ") + 1;
      }
      // Pass undefined to extract everything
      if (commaIndex <= 0) {
        commaIndex = undefined;
      }
      const citeKey =
        citeItem
          .substring(citeItem.indexOf("@"), commaIndex)
          .match(citeKeyRe)?.[0] ?? "";

      // We are left with the locator, suffix and label
      let afterKey = citeItem.split("@")[1].substring(citeKey.length).trim();
      if (afterKey[0] === ",") {
        afterKey = afterKey.substring(1).trim();
      }
      // Locator should be in the form of 11-22, 33
      // Would not work for roman numerals or alphabetical sections
      const locatorMatch = afterKey.match(/(\d|-| |,)+/g);
      if (locatorMatch !== null) {
        locator = locatorMatch[0].trim();
        // String before the locator is taken to be the label
        // Use heuristic from https://pandoc.org/MANUAL.html#citation-syntax to convert locator label to valid
        // Label has to be one of the following: https://docs.citationstyles.org/en/stable/specification.html#locators
        label = afterKey.split(locator)[0].trim();
        label = LOCATORS[label] || "page";
        // String after the locator is taken to be the suffix
        suffix = afterKey.split(locator)[1].trim();
      } else {
        // If no locator is found, entire string is assumed to be the suffix
        suffix = afterKey.trim();
      }

      entries.push({
        // Get the first capture group which returns the citekey without @
        id: citeItem.match(citeKeyRe)?.[1],
        locator,
        label,
        prefix,
        suffix,
        "suppress-author": suppressAuthor,
        form: "complex",
      });
    }
  } else {
    // Single item in the form of @item1
    // See https://citeproc-js.readthedocs.io/en/latest/running.html#special-citation-forms
    properties = { noteIndex: 0, mode: "composite", form: "simple" };
    entries = [citeString].map((str) => ({
      id: str.match(citeKeyRe)?.[1],
    }));
  }
  return [properties, entries];
};
