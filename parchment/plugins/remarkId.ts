import { visit } from "unist-util-visit";
import { nanoid } from "nanoid";

import { Tree } from "../types";

/**
 * Adds an ID to every node.
 */
export default function remarkId(): any {
  return (tree: Tree): any => {
    visit(tree, (node: Tree) => {
      node.id = nanoid();
    });

    return tree;
  };
}
