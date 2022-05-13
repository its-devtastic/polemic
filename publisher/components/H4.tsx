import React from "react";

import useConfig from "../hooks/useConfig";

const H4: React.FC<any> = ({ node, children, ...props }) => {
  const config = useConfig();

  return (
    <h4 {...props} className="text-xl italic text-slate-800 mb-2 mt-2">
      {config.sectionNumbering ? [node.section, children].join(" ") : children}
    </h4>
  );
};

export default H4;
