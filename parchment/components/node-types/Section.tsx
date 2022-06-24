import React from "react";

const Section: React.FC<{ node: any; children: any }> = ({ children }) => {
  return <section>{children}</section>;
};

export default Section;
