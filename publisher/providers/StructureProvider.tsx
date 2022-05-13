import React, { Dispatch, SetStateAction, useState } from "react";

import { Tree } from "../types";

export const Context = React.createContext<{
  tree: Tree | null;
  setTree: Dispatch<SetStateAction<Tree | null>>;
}>({ tree: null, setTree: () => {} });

export default function StructureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tree, setTree] = useState<Tree | null>(null);

  return (
    <Context.Provider value={{ tree, setTree }}>{children}</Context.Provider>
  );
}
