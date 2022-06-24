import React from "react";

import useConfig from "../../hooks/useConfig";
import { Tree } from "../../types";

const Table: React.FC<{ node: Tree; children: React.ReactElement[] }> = ({
  node,
  children,
}) => {
  const { tableNumbering, localization } = useConfig();
  const rows = React.Children.toArray(children);

  return (
    <div className="my-20 p-6 w-full space-y-2 bg-slate-100 rounded-md print:bg-transparent">
      <table className="w-full shadow-lg shadow-slate-700/5 rounded-md overflow-hidden print:rounded-none print:shadow-none">
        <thead>
          {React.cloneElement(rows[0] as React.ReactElement, {
            isHeader: true,
          })}
        </thead>
        <tbody>{rows.slice(1)}</tbody>
      </table>
      <div className="text-center">
        {tableNumbering && (
          <div className="text-md text-slate-600 italic font-bold">
            {localization.labels.tableNumbering.replace(/#/g, node.tableIndex)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
