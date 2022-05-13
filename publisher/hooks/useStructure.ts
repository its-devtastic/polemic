import React from "react";

import { Context } from "../providers/StructureProvider";

export default function useStructure() {
  return React.useContext(Context);
}
