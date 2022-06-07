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

// Rehype local assets support
export const rehypeAssets =
  (): any =>
  (tree: any): Promise<any> => {
    let counter = 1;
    visit(tree, (node) => {
      if (["img", "video"].includes(node.tagName)) {
        node.index = counter;
        counter = counter + 1;
      }
    });

    return tree;
  };

export const defaultVideoExtensions = ["mov", "mp4", "mpg", "mpeg", "avi"];

const videoExtRegex = new RegExp(`\\.(${defaultVideoExtensions.join("|")})$`);
const isVideoExt = (value: string) => videoExtRegex.test(value);

// Rehype video support
export const rehypeVideos =
  (): any =>
  (tree: any): Promise<any> => {
    visit(tree, (node) => {
      const src = node.properties?.src;

      if (node.tagName === "img" && isVideoExt(src)) {
        node.tagName = "video";
      }
    });

    return tree;
  };
