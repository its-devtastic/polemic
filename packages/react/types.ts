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
  figureNumbering: boolean;
  equationNumbering: boolean;
  tableNumbering: boolean;
  tableOfContents: boolean;
  citationStyle: "ama" | "vancouver" | "harvard1";
  citationLocale: "en-US" | "es-ES" | "de-DE" | "fr-FR" | "nl-NL";
  bibliography?: string;
  localization: {
    labels: {
      footnotes: string;
      bibliography: string;
      tableOfContents: string;
      figureNumbering: string;
      tableNumbering: string;
      equationNumbering: string;
    };
    dateTimeFormat: string;
  };
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
