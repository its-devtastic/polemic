import React from "react";

const H2: React.FC<{ children: any }> = ({ children }) => {
  return (
    <h2 className="text-2xl font-bold text-slate-800 mb-4 mt-2">{children}</h2>
  );
};

export default H2;
