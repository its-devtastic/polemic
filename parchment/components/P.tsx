import React from "react";

const P: React.FC<{ node: any }> = ({ node, ...props }) => {
  return <div {...props} className="paragraph" />;
};

export default P;
