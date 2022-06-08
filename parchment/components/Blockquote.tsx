import React from "react";

const Blockquote: React.FC<{ children: any }> = ({ children }) => {
  return (
    <blockquote className="italic ml-12 text-lg text-slate-500">
      <span>{'"'}</span>
      {children}
      <span>{'"'}</span>
    </blockquote>
  );
};

export default Blockquote;
