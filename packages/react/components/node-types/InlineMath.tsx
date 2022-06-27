import React from "react";
import katex from "katex";
import { useCopyToClipboard } from "react-use";

import { Tree } from "../../types";

const InlineMath: React.FC<{ node: Tree }> = ({ node }) => {
  const math = katex.renderToString(node.value!);
  const [_, copy] = useCopyToClipboard();

  return (
    <span
      className="hover:bg-slate-50 select-none cursor-pointer rounded-sm inline-block"
      dangerouslySetInnerHTML={{ __html: math }}
      onClick={() => copy(node.value!)}
    />
  );
};

export default InlineMath;
