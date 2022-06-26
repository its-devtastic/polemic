import React from "react";

import { Context } from "../providers/DocumentProvider";

export default function useDocument() {
  return React.useContext(Context);
}
