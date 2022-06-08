import React from "react";

import { Tree } from "../types";

const Paragraph: React.FC<{ node: Tree; children: any }> = ({ children }) => {
  return (
    <div className="text-xl mb-8 mt-4 text-slate-700 leading-relaxed">
      {children}
    </div>
  );
};

export default Paragraph;
