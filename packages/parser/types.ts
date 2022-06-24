export interface Position {
  column: number;
  line: number;
  offset: number;
}

export interface Node {
  id: string;
  type: string;
  depth?: number;
  section?: string;
  value?: string;
  properties?: Record<string, any>;
  children?: Node[];
  position: {
    start: Position;
    end: Position;
  };
  [p: string]: any;
}

export interface ParseResult {
  md: string;
  mdast: Node;
  frontMatter: Record<string, string>;
}
