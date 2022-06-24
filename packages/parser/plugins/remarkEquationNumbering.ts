import { visit } from "unist-util-visit";

import { Node } from "../types";

/**
 * Remark plugin that adds an equation index to all
 * block math equation.
 */
export default function remarkEquationNumbering(): any {
  return (tree: Node): any => {
    let counter = 1;
    visit(tree, "math", (node: Node) => {
      node.equationIndex = counter;
      counter = counter + 1;
    });

    return tree;
  };
}
