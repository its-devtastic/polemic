import { visit } from "unist-util-visit";

import { Tree } from "../types";

/**
 * Remark plugin that adds a table index
 */
export default function remarkTableNumbering(): any {
  return (tree: Tree): any => {
    let counter = 1;
    visit(tree, "table", (node: Tree) => {
      node.tableIndex = counter;
      counter = counter + 1;
    });

    return tree;
  };
}
