import { visit } from "unist-util-visit";
import * as R from "ramda";
import { nanoid } from "nanoid";

import { Node } from "../../types";
import { citeExtractorRe } from "./regex";
import { parseCitation } from "./parse";

const permittedNodeTypes = ["paragraph", "blockquote"];

/**
 * Remark plugin for parsing citation marks.
 *
 * Citations can be simple (e.g. @smith01) or complex (e.g. [see @smith01; @sally96, p. 44]
 */
export default function remarkCitation({ cite }: { cite: any }): any {
  return (tree: Node): any => {
    // Add a bibliography node to the root of the tree containing the bibliography data.
    tree.children = [
      { type: "bibliography", csl: cite.data } as any,
      ...(tree.children ?? []),
    ];

    visit(tree, "text", (node: Node, idx, parent: Node) => {
      // Only allow citation in permitted node types
      if (!node.value || !permittedNodeTypes.includes(parent.type)) {
        return;
      }

      // Get all matches (both simple and complex)
      const matches = Array.from(node.value.matchAll(citeExtractorRe));

      if (R.isEmpty(matches)) {
        return;
      }

      // Keep a cursor to correctly cut the text into text and citation nodes.
      let cursor = 0;
      const newChildren = [];

      for (let match of matches) {
        const citeStartIdx = match.index ?? 0;
        const citeEndIdx = (match.index ?? 0) + match[0].length;
        // Create text node for text before citation
        if (citeStartIdx > cursor) {
          const value = node.value.substring(cursor, citeStartIdx);

          newChildren.push({
            id: nanoid(),
            type: "text",
            value,
            position: {
              start: {
                column: node.position.start.column + cursor,
                line: node.position.start.line,
                offset: node.position.start.offset + cursor,
              },
              end: {
                column: node.position.start.column + cursor + value.length,
                line: node.position.start.line,
                offset: node.position.start.offset + cursor + value.length,
              },
            },
          });
        }

        // Parse citation into properties and entries
        const [citationProps, entries] = parseCitation(match[0]);
        const value = node.value.substring(citeStartIdx, citeEndIdx);

        newChildren.push({
          id: nanoid(),
          type: "citation",
          value,
          entries,
          csl: cite.data.filter(({ id }: { id: string }) =>
            entries.some(R.whereEq({ id }))
          ),
          citationProps,
          position: {
            start: {
              column: node.position.start.column + cursor + value.length,
              line: node.position.start.line,
              offset: node.position.start.offset + cursor + value.length,
            },
            end: {
              column: node.position.start.column + cursor + value.length,
              line: node.position.start.line,
              offset: node.position.start.offset + cursor + value.length,
            },
          },
        });

        // Update cursor
        cursor = citeEndIdx;
      }

      parent.children = newChildren as any;
    });
  };
}
