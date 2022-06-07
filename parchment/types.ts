export enum ProjectType {
  Article = "article",
  Blog = "blog",
  Book = "book",
}

export interface Position {
  column: number;
  line: number;
  offset: number;
}

export interface ProjectConfig {
  type: ProjectType;
  sectionNumbering: boolean;
  assetNumbering: boolean;
  tableOfContents: boolean;
}

export interface Tree {
  id: string;
  type: string;
  tagName: string;
  section: string;
  value: string;
  properties: Record<string, any>;
  children: Tree[];
  position: {
    start: Position;
    end: Position;
  };
}

export interface Document {
  md: string;
  hast: Tree;
  mdast: Tree;
  frontMatter: Record<string, string>;
}
