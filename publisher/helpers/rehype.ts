import { visit } from "unist-util-visit";

export const rehypeAddSections =
  (): any =>
  (tree: any): any => {
    let headingIndex = 1;
    let sectionIndex = 1;
    let subSectionIndex = 1;

    visit(tree, (node) => {
      if (node.tagName === "h2") {
        node.section = headingIndex;
        sectionIndex = 1;
        subSectionIndex = 1;
        headingIndex++;
      }
      if (node.tagName === "h3") {
        node.section = `${headingIndex}.${sectionIndex}`;
        subSectionIndex = 1;
        sectionIndex++;
      }
      if (node.tagName === "h4") {
        node.section = `${headingIndex}.${sectionIndex}.${subSectionIndex}`;
        subSectionIndex++;
      }
    });

    return tree;
  };
