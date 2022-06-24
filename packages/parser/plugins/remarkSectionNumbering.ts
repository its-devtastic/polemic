import { visit } from "unist-util-visit";

import { Node } from "../types";

/**
 * Remark plugin that adds section numbering to headings.
 */
export default function remarkSectionNumbering(): any {
  return (tree: Node): any => {
    let headingIndex = 1;
    let sectionIndex = 1;
    let subSectionIndex = 1;
    let subSubSectionIndex = 1;
    let subSubSubSectionIndex = 1;

    visit(tree, "heading", (node: Node) => {
      switch (node.depth) {
        case 2:
          node.section = `${headingIndex}`;
          sectionIndex = 1;
          subSectionIndex = 1;
          subSubSectionIndex = 1;
          subSubSubSectionIndex = 1;
          headingIndex++;
          break;
        case 3:
          node.section = `${headingIndex}.${sectionIndex}`;
          subSectionIndex = 1;
          subSubSectionIndex = 1;
          subSubSubSectionIndex = 1;
          sectionIndex++;
          break;
        case 4:
          node.section = `${headingIndex}.${sectionIndex}.${subSectionIndex}`;
          subSubSectionIndex = 1;
          subSubSubSectionIndex = 1;
          subSectionIndex++;
          break;
        case 5:
          node.section = `${headingIndex}.${sectionIndex}.${subSectionIndex}.${subSubSectionIndex}`;
          subSubSubSectionIndex = 1;
          subSubSectionIndex++;
          break;
        case 6:
          node.section = `${headingIndex}.${sectionIndex}.${subSectionIndex}.${subSubSectionIndex}.${subSubSubSectionIndex}`;
          subSubSubSectionIndex++;
          break;
      }
    });
  };
}
