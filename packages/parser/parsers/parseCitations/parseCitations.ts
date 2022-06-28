import { INode } from "@polemic/types";

import remarkCitation from "../../plugins/remarkCitation";
import { toCSL } from "./cite";

export default function parseCitations(mdast: INode, bibData: string) {
  const cite = toCSL(bibData);

  return {
    mdast: remarkCitation({ cite })(mdast),
    csl: cite,
  };
}
