import React, { useState } from "react";
import { IParsedDocument } from "@polemic/types";

export const Context = React.createContext<{
  docs: IParsedDocument[];
  activeDocument: IParsedDocument | null;
}>({
  docs: [],
  activeDocument: null,
});

export default function DocumentProvider({
  children,
  docs,
}: {
  children: React.ReactNode;
  docs: IParsedDocument[];
}) {
  const [activeDocument, setActiveDocument] = useState(docs[0]);

  return (
    <Context.Provider value={{ docs, activeDocument }}>
      {children}
    </Context.Provider>
  );
}
