import Cite from "citation-js";

export const toCSL = (data: string): any => {
  return new Cite(data, { generateGraph: false });
};
