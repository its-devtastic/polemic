import React from "react";

const P: React.FC<{ children: any }> = ({ children }) => {
  return (
    <p className="text-xl mb-8 text-slate-700 leading-relaxed">{children}</p>
  );
};

export default P;
