import React from "react";

import { ProjectConfig } from "../types";

export const Context = React.createContext({});

export default function ConfigProvider({
  config,
  children,
}: {
  config: ProjectConfig;
  children: React.ReactNode;
}) {
  return <Context.Provider value={config}>{children}</Context.Provider>;
}
