import React from "react";
import * as R from "ramda";
import camelcase from "camelcase";

import { Tree } from "../types";
import Blockquote from "./node-types/Blockquote";
import Citation from "./node-types/Citation";
import Footnote from "./node-types/Footnote";
import Heading from "./node-types/Heading";
import Img from "./node-types/Img";
import InlineMath from "./node-types/InlineMath";
import Li from "./node-types/Li";
import Link from "./node-types/Link";
import Math from "./node-types/Math";
import Ol from "./node-types/Ol";
import Paragraph from "./node-types/Paragraph";
import Raw from "./node-types/Raw";
import Section from "./node-types/Section";
import Table from "./node-types/Table";
import TableCell from "./node-types/TableCell";
import TableRow from "./node-types/TableRow";
import Video from "./node-types/Video";

const COMPONENTS: Record<string, React.FC<any>> = {
  blockquote: Blockquote,
  citation: Citation,
  footnoteReference: Footnote,
  heading: Heading,
  image: Img,
  inlineMath: InlineMath,
  li: Li,
  link: Link,
  math: Math,
  ol: Ol,
  paragraph: Paragraph,
  raw: Raw,
  section: Section,
  table: Table,
  tableCell: TableCell,
  tableRow: TableRow,
  video: Video,
};

// Converts a style string to an object to comply with React
function styleStringToObject(style: string): Record<string, string> {
  return style
    .split(";")
    .filter(Boolean)
    .reduce(
      (result, value) => ({
        ...result,
        [camelcase(value.split(":")[0]?.trim())]: value.split(":")[1]?.trim(),
      }),
      {}
    );
}

// Maps a hast tree to React components
function treeToReact(tree: Tree): any {
  const cmp = COMPONENTS[tree.type];

  return tree.type === "text"
    ? tree.value
    : tree.type === "root"
    ? tree.children?.map(treeToReact)
    : cmp
    ? React.createElement(
        cmp,
        {
          key: tree.id,
          node: tree,
          ...R.evolve({
            style: styleStringToObject,
          })(tree?.properties || {}),
        },
        tree.children?.map(treeToReact)
      )
    : null;
}

const Renderer: React.FC<{ mdast: Tree }> = ({ mdast }) => {
  return treeToReact(mdast);
};

export default Renderer;
