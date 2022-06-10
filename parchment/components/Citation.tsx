import React from "react";
import * as R from "ramda";
import Cite from "citation-js";

import { Tree } from "../types";
import useConfig from "../hooks/useConfig";

const Citation: React.FC<{ node: Tree }> = ({ node }) => {
  const { citationStyle, citationLocale } = useConfig();
  const citation = new Cite(node.csl);

  return (
    <span className="text-slate-400 print:text-black">
      {R.isEmpty(node.csl) ? (
        <span
          className="text-red-500 bg-red-50 font-mono"
          title="Invalid reference"
        >
          {node.value}
        </span>
      ) : (
        <a
          href={`#${
            node.csl.length > 1 ? "bibliography" : `bib-${node.csl[0].id}`
          }`}
        >
          {citation.format("citation", {
            template: citationStyle,
            locale: citationLocale,
          })}
        </a>
      )}
    </span>
  );
};

export default Citation;
