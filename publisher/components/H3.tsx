import React from "react";

const H3: React.FC<{ children: any }> = ({ children }) => {
  return (
    <h3 className="text-xl font-bold text-slate-800 mb-2 mt-2">{children}</h3>
  );
};

export default H3;
