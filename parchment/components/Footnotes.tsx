import React from "react";
import * as R from "ramda";
import { toString } from "mdast-util-to-string";

import { Tree } from "../types";

const Footnotes: React.FC<{ mdast: Tree }> = ({ mdast }) => {
  const footnotes =
    mdast.children?.filter(R.whereEq({ type: "footnoteDefinition" })) ?? [];

  return !R.isEmpty(footnotes) ? (
    <div>
      <h2 className="mb-4 mt-2 text-3xl font-bold text-slate-900">Footnotes</h2>
      <ol className="space-y-2">
        {footnotes.map(({ id, label, identifier, children }) => (
          <li key={id} id={`footnote-${identifier}`} className="text-md">
            <span className="font-sans">{`${label}. `}</span>
            <span>{toString(children)}</span>
          </li>
        ))}
      </ol>
    </div>
  ) : null;
};

export default Footnotes;
