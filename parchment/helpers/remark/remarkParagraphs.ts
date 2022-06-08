import { visitParents } from "unist-util-visit-parents";

import { Tree } from "../../types";

/**
 * Remark plugin to only allow top-level paragraphs.
 */
export default function remarkParagraphs(): any {
  return (tree: Tree): any => {
    visitParents(tree, "paragraph", (node: Tree, parents: Tree[]) => {
      if (parents[parents.length - 1].type !== "root") {
        node.type = "raw";
      }
    });

    return tree;
  };
}
