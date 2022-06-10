import { ProjectConfig, ProjectType } from "../types";

export const defaultProjectConfig: ProjectConfig = {
  type: ProjectType.Article,
  sectionNumbering: true,
  assetNumbering: true,
  equationNumbering: true,
  tableOfContents: true,
  citationLocale: "en-US",
  citationStyle: "ama",
  localization: {
    labels: {
      footnotes: "Footnotes",
      bibliography: "Bibliography",
      tableOfContents: "Table of Contents",
    },
    dateTimeFormat: "D MMMM YYYY",
  },
};
