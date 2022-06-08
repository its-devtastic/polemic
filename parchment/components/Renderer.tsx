import React from "react";
import * as R from "ramda";
import camelcase from "camelcase";

import { Tree } from "../types";
import Blockquote from "./Blockquote";
import Footnote from "./Footnote";
import Heading from "./Heading";
import Img from "./Img";
import InlineMath from "./InlineMath";
import Li from "./Li";
import Link from "./Link";
import Math from "./Math";
import Ol from "./Ol";
import Paragraph from "./Paragraph";
import Raw from "./Raw";
import Section from "./Section";
import Video from "./Video";
import Citation from "./Citation";

const COMPONENTS: Record<string, React.FC<any>> = {
  blockquote: Blockquote,
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
  video: Video,
  citation: Citation,
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
