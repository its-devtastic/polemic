import React from "react";

import classNames from "classnames";
import useToC from "../hooks/useToC";

const TableOfContents: React.FC = () => {
  const { headings, activeSection } = useToC();

  return (
    <div>
      {headings.map(({ depth, properties, section, children }) => (
        <div
          key={section}
          className={classNames("", {
            ["text-xl font-bold text-slate-900"]: depth === 2,
            ["text-lg font-bold ml-4 text-slate-700"]: depth === 3,
            ["ml-8 italic text-md text-slate-600"]: depth === 4,
            ["ml-12 text-sm font-bold text-slate-500"]: depth === 5,
            ["ml-16 italic text-sm text-slate-500"]: depth === 6,
            ["text-blue-700"]: activeSection === properties?.id,
          })}
        >
          <a href={`#${properties?.id}`}>{`${section} ${children}`}</a>
        </div>
      ))}
    </div>
  );
};

export default TableOfContents;
