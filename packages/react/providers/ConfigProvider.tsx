import React from "react";
import { IProjectConfig } from "@polemic/types";

export const Context = React.createContext({});

export default function ConfigProvider({
  config,
  children,
}: {
  config: IProjectConfig;
  children: React.ReactNode;
}) {
  return <Context.Provider value={config}>{children}</Context.Provider>;
}
