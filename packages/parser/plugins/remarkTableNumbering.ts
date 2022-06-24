import { visit } from "unist-util-visit";

import { Node } from "../types";

/**
 * Remark plugin that adds a table index
 */
export default function remarkTableNumbering(): any {
  return (tree: Node): any => {
    let counter = 1;
    visit(tree, "table", (node: Node) => {
      node.tableIndex = counter;
      counter = counter + 1;
    });

    return tree;
  };
}
