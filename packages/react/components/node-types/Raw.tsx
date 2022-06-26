import React from "react";

import { Tree } from "../../types";

const Raw: React.FC<{ node: Tree; children: any }> = ({ children }) => {
  return <span>{children}</span>;
};

export default Raw;
