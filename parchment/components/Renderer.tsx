import React from "react";
import * as R from "ramda";
import camelcase from "camelcase";

import { Tree } from "../types";
import Raw from "./Raw";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Img from "./Img";
import Video from "./Video";
import Link from "./Link";
import Ol from "./Ol";
import Li from "./Li";
import InlineMath from "./InlineMath";
import Math from "./Math";
import Blockquote from "./Blockquote";
import Footnote from "./Footnote";

const COMPONENTS: Record<string, React.FC<any>> = {
  raw: Raw,
  paragraph: Paragraph,
  heading: Heading,
  blockquote: Blockquote,
  link: Link,
  ol: Ol,
  li: Li,
  image: Img,
  video: Video,
  inlineMath: InlineMath,
  math: Math,
  footnoteReference: Footnote,
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
