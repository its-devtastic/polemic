import React from "react";

import useConfig from "../hooks/useConfig";

const H3: React.FC<any> = ({ node, children, ...props }) => {
  const config = useConfig();

  return (
    <h3 {...props} className="text-xl font-bold text-slate-800 mb-2 mt-2">
      {config.sectionNumbering ? [node.section, children].join(" ") : children}
    </h3>
  );
};

export default H3;
