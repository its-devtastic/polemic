import React from "react";
import katex from "katex";
import { useCopyToClipboard } from "react-use";

import { Tree } from "../../types";
import useConfig from "../../hooks/useConfig";

const Math: React.FC<{ node: Tree }> = ({ node }) => {
  const math = katex.renderToString(node.value!);
  const [_, copy] = useCopyToClipboard();
  const { equationNumbering } = useConfig();

  return (
    <div className="flex items-center">
      {equationNumbering && (
        <span className="text-lg px-8 text-slate-500 select-none">{`(${node.equationIndex})`}</span>
      )}
      <div className="flex justify-center flex-1">
        <div
          className="hover:bg-slate-50 select-none cursor-pointer rounded-sm p-2 text-sky-800"
          dangerouslySetInnerHTML={{ __html: math }}
          onClick={() => copy(node.value!)}
        />
      </div>
    </div>
  );
};

export default Math;
