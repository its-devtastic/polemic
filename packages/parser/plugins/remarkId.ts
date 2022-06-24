import { visit } from "unist-util-visit";
import { nanoid } from "nanoid";

import { Node } from "../types";

/**
 * Adds an ID to every node.
 */
export default function remarkId(): any {
  return (tree: Node): any => {
    visit(tree, (node: Node) => {
      node.id = nanoid();
    });

    return tree;
  };
}
