import React from "react";

import useConfig from "../hooks/useConfig";

const H2: React.FC<any> = ({ node, children, ...props }) => {
  const config = useConfig();

  return (
    <h2 {...props} className="text-2xl font-bold text-slate-800 mb-4 mt-2">
      {config.sectionNumbering ? [node.section, children].join(" ") : children}
    </h2>
  );
};

export default H2;
