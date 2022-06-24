import React from "react";

const Li: React.FC<{ node: any }> = ({ node, ...props }) => {
  return <li {...props} />;
};

export default Li;
