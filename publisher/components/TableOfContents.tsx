import React from "react";
import * as R from "ramda";

import classNames from "classnames";
import useToC from "../hooks/useToC";

const TableOfContents: React.FC = () => {
  const { headings, activeSection } = useToC();

  return (
    <div>
      {headings.map(({ properties, tagName, section, children }) => (
        <div
          key={section}
          className={classNames("", {
            ["text-xl font-bold text-slate-900"]: tagName === "h2",
            ["text-lg font-bold ml-4 text-slate-700"]: tagName === "h3",
            ["ml-8 italic text-md text-slate-600"]: tagName === "h4",
            ["ml-12 text-sm font-bold text-slate-500"]: tagName === "h5",
            ["ml-16 italic text-sm text-slate-500"]: tagName === "h6",
            ["text-blue-700"]: activeSection === properties.id,
          })}
        >
          <a href={`#${properties.id}`}>{`${section} ${children.map(
            R.prop("value")
          )}`}</a>
        </div>
      ))}
    </div>
  );
};

export default TableOfContents;
