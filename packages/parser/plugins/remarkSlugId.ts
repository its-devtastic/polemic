import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import slugify from "slugify";

import { Node } from "../types";

/**
 * Adds an ID to the properties of headings.
 * The ID is a slugified version of the text inside the heading.
 */
export default function remarkSlugId(): any {
  return (tree: Node): any => {
    visit(tree, "heading", (node: Node) => {
      node.properties = node.properties || {};
      node.properties.id = slugify(toString(node), { lower: true });
    });

    return tree;
  };
}
