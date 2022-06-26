import { ProjectConfig, ProjectType } from "../types";

export const defaultProjectConfig: ProjectConfig = {
  type: ProjectType.Article,
  sectionNumbering: true,
  figureNumbering: true,
  tableNumbering: true,
  equationNumbering: true,
  tableOfContents: true,
  citationLocale: "en-US",
  citationStyle: "ama",
  localization: {
    labels: {
      footnotes: "Footnotes",
      bibliography: "Bibliography",
      tableOfContents: "Table of Contents",
      figureNumbering: "Figure (#)",
      tableNumbering: "Table (#)",
      equationNumbering: "Equation (#)",
    },
    dateTimeFormat: "D MMMM YYYY",
  },
};
