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
  equationNumbering: boolean;
  tableOfContents: boolean;
}

export interface Tree {
  id: string;
  type: string;
  depth?: number;
  section?: string;
  value?: string;
  properties?: Record<string, any>;
  children?: Tree[];
  position: {
    start: Position;
    end: Position;
  };
  [p: string]: any;
}

export interface Document {
  md: string;
  mdast: Tree;
  frontMatter: Record<string, string>;
}
