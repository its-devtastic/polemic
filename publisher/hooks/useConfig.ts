import React from "react";

import { Context } from "../providers/ConfigProvider";

export default function useConfig() {
  return React.useContext(Context);
}
