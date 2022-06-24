import { findAfter } from "unist-util-find-after";
import { visitParents } from "unist-util-visit-parents";
import { Tree } from "../types";

const MAX_HEADING_DEPTH = 6;

/**
 * Remark plugin that wraps each section in a node.
 */
export default function remarkSectionize(): any {
  return (tree: Tree) => {
    for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
      visitParents(
        tree,
        (node: any) => node.type === "heading" && node.depth === depth,
        sectionize
      );
    }
  };
}

function sectionize(node: any, ancestors: any[]) {
  const start = node;
  const depth = start.depth!;
  const parent = ancestors[ancestors.length - 1];

  const isEnd = (node: any) =>
    (node.type === "heading" && node.depth <= depth) || node.type === "export";
  const end = findAfter(parent as any, start, isEnd);

  const startIndex = parent.children.indexOf(start);
  const endIndex = parent.children.indexOf(end);

  const between = parent.children.slice(
    startIndex,
    endIndex > 0 ? endIndex : undefined
  );

  const section = {
    type: "section",
    depth: depth,
    children: between,
  };

  parent.children.splice(startIndex, section.children.length, section);
}
