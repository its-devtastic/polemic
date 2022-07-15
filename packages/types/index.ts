/**
 * Adapters handle documents, config, bibliography or assets.
 * They provide a unified interface and abstract away certain
 * implementation details. This allows moving between file system
 * and other storage types (e.g. DB, API).
 */
export interface IAdapter {
  type: "documents" | "config" | "bibliography" | "assets";
  files: IVFile[];
  load(repository: IRepository): void;
  parse(repository: IRepository): void;
}

/**
 * The documents adapter loads Markdown documents and runs
 * them through the parser.
 */
export interface IDocumentsAdapter extends IAdapter {
  type: "documents";
  documents: IParsedDocument[];
}

export interface IParsedDocument {
  file: string;
  mdast: INode;
  frontMatter: Record<string, string>;
}

export interface IVFile {
  content: string;
  uri: string;
}

/**
 * The bibliography adapter loads bib files and parses them.
 * Also parses citations in the loaded documents.
 */
export interface IBibliographyAdapter extends IAdapter {
  type: "bibliography";
  csl: any;
}

/**
 * The config adapter loads Polemic configuration data
 * from a file or other source.
 */
export interface IConfigAdapter extends IAdapter {
  type: "config";
  config: IProjectConfig | null;
  update(config: Partial<IProjectConfig>): Promise<this>;
}

/**
 * The assets adapter loads files that are referenced
 * in the document.
 */
export interface IAssetsAdapter extends IAdapter {
  type: "assets";
}

/**
 * The repository represents a Polemic project.
 * It uses adapters to load project data on different environments.
 */
export interface IRepository {
  projectDir: string;
  config: IConfigAdapter | null;
  documents: IDocumentsAdapter | null;
  bibliography: IBibliographyAdapter | null;
  assets: IAssetsAdapter | null;
  initialize(): Promise<any>;
  loadAdapters(): Promise<any>;
  loadAdapter(adapter: IAdapter): Promise<any>;
}

/**
 * A MDAST tree consists of nodes containing information about a part
 * of the Polemic document.
 */
export interface INode {
  id: string;
  type: string;
  depth?: number;
  section?: string;
  value?: string;
  properties?: Record<string, any>;
  children?: INode[];
  position: {
    start: IPosition;
    end: IPosition;
  };
  [p: string]: any;
}

export enum ProjectType {
  Article = "article",
  Blog = "blog",
  Book = "book",
}

export interface IPosition {
  column: number;
  line: number;
  offset: number;
}

export interface IProjectConfig {
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
  pub?: {
    projectId: string;
  };
}
