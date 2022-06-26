import React from "react";

const TableRow: React.FC<{
  children: React.ReactElement[];
  isHeader: boolean;
}> = ({ children, isHeader = false }) => (
  <tr>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { isHeader })
    )}
  </tr>
);

export default TableRow;
