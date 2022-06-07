import React from "react";
import * as R from "ramda";
import camelcase from "camelcase";

import { Tree } from "../types";
import Heading from "./Heading";
import P from "./P";
import Img from "./Img";
import Video from "./Video";

const COMPONENTS: Record<string, React.FC<any>> = {
  p: P,
  h1: () => (
    <div className="font-mono select-none bg-red-50 text-red-600 rounded-sm px-2 py-1 font-sans text-sm">
      👮 Level 1 headings (<code>#</code>) are not allowed here. Start at level
      2 (<code>##</code>) instead.
    </div>
  ),
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  img: Img,
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
  return tree.type === "text"
    ? tree.value
    : tree.type === "root"
    ? tree.children.map(treeToReact)
    : React.createElement(
        COMPONENTS[tree.tagName] || tree.tagName,
        {
          key: tree.id,
          node: tree,
          ...R.evolve({
            style: styleStringToObject,
          })(tree.properties),
        },
        tree.children.map(treeToReact)
      );
}

const Renderer: React.FC<{ hast: Tree }> = ({ hast }) => {
  return treeToReact(hast);
};

export default Renderer;
