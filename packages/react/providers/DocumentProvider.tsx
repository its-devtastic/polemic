import React, { useState } from "react";

import { Document } from "../types";

export const Context = React.createContext<{
  docs: Document[];
  activeDocument: Document | null;
}>({
  docs: [],
  activeDocument: null,
});

export default function DocumentProvider({
  children,
  docs,
}: {
  children: React.ReactNode;
  docs: Document[];
}) {
  const [activeDocument, setActiveDocument] = useState(docs[0]);

  return (
    <Context.Provider value={{ docs, activeDocument }}>
      {children}
    </Context.Provider>
  );
}
