import React from "react";

import { ProjectConfig } from "../types";
import { defaultProjectConfig } from "../helpers/config";

export const Context = React.createContext(defaultProjectConfig);

export default function ConfigProvider({
  config,
  children,
}: {
  config: ProjectConfig;
  children: React.ReactNode;
}) {
  return <Context.Provider value={config}>{children}</Context.Provider>;
}