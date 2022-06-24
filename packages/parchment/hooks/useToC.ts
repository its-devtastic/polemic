import React from "react";

import { Context } from "../providers/ToCProvider";

export default function useToC() {
  return React.useContext(Context);
}
