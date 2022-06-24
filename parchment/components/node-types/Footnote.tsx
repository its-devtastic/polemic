import React from "react";

import { Tree } from "../../types";

const Footnote: React.FC<{ node: Tree; children: any }> = ({ node }) => {
  return (
    <span className="align-super text-sm font-sans text-amber-500">
      <a href={`#footnote-${node.identifier}`}>{node.label}</a>
    </span>
  );
};

export default Footnote;
