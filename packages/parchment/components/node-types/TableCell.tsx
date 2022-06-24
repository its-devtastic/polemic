import React from "react";

const TableCell: React.FC<{ children: React.ReactNode; isHeader: boolean }> = ({
  children,
  isHeader,
}) =>
  isHeader ? (
    <th className="text-left font-bold border-b print:border border-slate-300 p-3 bg-white print:bg-transparent text-slate-900 print:text-black">
      {children}
    </th>
  ) : (
    <td className="print:border print:border-slate-300 p-3 bg-white print:bg-transparent text-slate-700 print:text-black">
      {children}
    </td>
  );

export default TableCell;
