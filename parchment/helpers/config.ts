import { ProjectConfig, ProjectType } from "../types";

export const defaultProjectConfig: ProjectConfig = {
  type: ProjectType.Article,
  sectionNumbering: true,
  assetNumbering: true,
  tableOfContents: true,
};
