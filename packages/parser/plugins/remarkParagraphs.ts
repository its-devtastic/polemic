import { visitParents } from "unist-util-visit-parents";

import { Node } from "../types";

/**
 * Remark plugin to only allow top-level paragraphs.
 */
export default function remarkParagraphs(): any {
  return (tree: Node): any => {
    visitParents(tree, "paragraph", (node: Node, parents: Node[]) => {
      if (parents[parents.length - 1].type !== "root") {
        node.type = "raw";
      }
    });

    return tree;
  };
}
