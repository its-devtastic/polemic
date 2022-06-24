import { visit } from "unist-util-visit";

import { Tree } from "../types";

/**
 * Remark plugin that adds an equation index to all
 * block math equation.
 */
export default function remarkEquationNumbering(): any {
  return (tree: Tree): any => {
    let counter = 1;
    visit(tree, "math", (node: Tree) => {
      node.equationIndex = counter;
      counter = counter + 1;
    });

    return tree;
  };
}
