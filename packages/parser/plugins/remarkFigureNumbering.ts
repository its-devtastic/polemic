import { visit } from "unist-util-visit";

import { Node } from "../types";

/**
 * Remark plugin that adds a figure index to all
 * asset types (images, videos, etc.).
 */
export default function remarkFigureNumbering(): any {
  return (tree: Node): any => {
    let counter = 1;
    visit(tree, ["image", "video"], (node: Node) => {
      node.figureIndex = counter;
      counter = counter + 1;
    });

    return tree;
  };
}
