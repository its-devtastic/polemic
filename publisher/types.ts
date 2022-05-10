export enum ProjectType {
  Article = "article",
  Blog = "blog",
  Book = "book",
}

export interface ProjectConfig {
  type: ProjectType;
}
