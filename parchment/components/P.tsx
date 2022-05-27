import React from "react";

const P: React.FC<{ node: any }> = ({ node, ...props }) => {
  return (
    <p {...props} className="text-xl mb-8 text-slate-700 leading-relaxed" />
  );
};

export default P;
