import React from "react";
import * as R from "ramda";
import Cite from "citation-js";

import { Tree } from "../types";
import useConfig from "../hooks/useConfig";

const Bibliography: React.FC<{ mdast: Tree }> = ({ mdast }) => {
  const { citationStyle, citationLocale, localization } = useConfig();
  const node = mdast.children?.find(R.whereEq({ type: "bibliography" }));
  const bibliography = node
    ? new Cite(node.csl, { locale: citationLocale, template: citationStyle })
        .format("bibliography")
        .split("\n")
        .filter(R.complement(R.isEmpty))
        .map((line: string, idx: number) => [line, node.csl[idx]])
    : "";

  return !R.isEmpty(bibliography) ? (
    <div>
      <h2
        id="bibliography"
        className="mb-4 mt-12 text-3xl font-bold text-slate-900"
      >
        {localization.labels.bibliography}
      </h2>
      <ol className="space-y-2">
        {bibliography.map(([line, csl]: [string, any]) => (
          <li key={csl.id} id={`bib-${csl.id}`} className="text-md">
            <span>{line}</span>
          </li>
        ))}
      </ol>
    </div>
  ) : null;
};

export default Bibliography;
