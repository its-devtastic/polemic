import { visit } from "unist-util-visit";
import { nanoid } from "nanoid";

export const rehypeAddSections =
  (): any =>
  (tree: any): any => {
    let headingIndex = 1;
    let sectionIndex = 1;
    let subSectionIndex = 1;
    let subSubSectionIndex = 1;
    let subSubSubSectionIndex = 1;

    visit(tree, (node) => {
      if (node.tagName === "h2") {
        node.section = headingIndex;
        sectionIndex = 1;
        subSectionIndex = 1;
        subSubSectionIndex = 1;
        subSubSubSectionIndex = 1;
        headingIndex++;
      }
      if (node.tagName === "h3") {
        node.section = `${headingIndex}.${sectionIndex}`;
        subSectionIndex = 1;
        subSubSectionIndex = 1;
        subSubSubSectionIndex = 1;
        sectionIndex++;
      }
      if (node.tagName === "h4") {
        node.section = `${headingIndex}.${sectionIndex}.${subSectionIndex}`;
        subSubSectionIndex = 1;
        subSubSubSectionIndex = 1;
        subSectionIndex++;
      }
      if (node.tagName === "h5") {
        node.section = `${headingIndex}.${sectionIndex}.${subSectionIndex}.${subSubSectionIndex}`;
        subSubSubSectionIndex = 1;
        subSubSectionIndex++;
      }
      if (node.tagName === "h6") {
        node.section = `${headingIndex}.${sectionIndex}.${subSectionIndex}.${subSubSectionIndex}.${subSubSubSectionIndex}`;
        subSubSubSectionIndex++;
      }
    });

    return tree;
  };

export const rehypeAddNodeId =
  (): any =>
  (tree: any): any => {
    visit(tree, (node) => {
      node.id = nanoid();
    });

    return tree;
  };
