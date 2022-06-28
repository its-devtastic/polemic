import glob from "glob";
import fs from "fs-extra";
import { cosmiconfig } from "cosmiconfig";
import matter from "gray-matter";
import * as R from "ramda";
import parse, { parseLocalFiles, parseCitations } from "@polemic/parser";
import {
  IAssetsAdapter,
  IBibliographyAdapter,
  IConfigAdapter,
  IDocumentsAdapter,
  IParsedDocument,
  IProjectConfig,
  IRepository,
  IVFile,
} from "@polemic/types";

import { defaultProjectConfig } from "../constants";

/**
 * Documents adapter.
 *
 * Looks for and parses *.md files in the project directory.
 */
export class DocumentsAdapter implements IDocumentsAdapter {
  readonly type = "documents";
  files: IVFile[] = [];
  documents: IParsedDocument[] = [];

  async load(repository: IRepository) {
    this.files = glob
      .sync("**/*.md", {
        cwd: repository.projectDir,
        ignore: ["node_modules/**"],
        dot: false,
        realpath: true,
      })
      .map((filePath: string) => ({
        content: fs.readFileSync(filePath, { encoding: "utf-8" }),
        uri: filePath,
      }));
  }

  async parse(repository: IRepository) {
    this.documents = await Promise.all(
      this.files.map(async ({ uri, content }) => {
        const { mdast, frontMatter } = await parse(content);

        return { mdast, frontMatter, file: uri };
      })
    );
  }
}

/**
 * Bibliography adapter.
 *
 * Looks for and parses *.md files in the project directory.
 */
export class BibliographyAdapter implements IBibliographyAdapter {
  readonly type = "bibliography";
  files: IVFile[] = [];
  csl: any;

  async load(repository: IRepository) {
    const frontMatterPaths: string[] =
      repository.documents?.files
        .map(({ content }) => matter(content).data?.bibliography)
        .filter(Boolean) ?? [];

    const configPaths: string[] = R.ifElse(
      R.isNil,
      R.always([]),
      R.of
    )(repository.config?.config?.bibliography);

    const foundPaths = glob.sync("*.bib", {
      cwd: repository.projectDir,
      realpath: true,
      ignore: ["node_modules/**"],
      dot: false,
    });

    this.files = [...configPaths, ...frontMatterPaths, ...foundPaths]
      .map((path) => {
        try {
          const content = fs.readFileSync(path, { encoding: "utf-8" });
          return { content, uri: path };
        } catch (e) {
          console.log(`Could not find bibliography file located at ${path}`);
          return null;
        }
      })
      .filter((i) => !R.isNil(i)) as IVFile[];
  }

  parse(repository: IRepository) {
    return this.files.map(({ content }) => {
      repository.documents?.documents.forEach((document) => {
        const { mdast, csl } = parseCitations(document.mdast, content);
        document.mdast = mdast;

        this.csl = R.mergeDeepRight(this.csl, csl);
      });
    });
  }
}

/**
 * Config adapter.
 *
 * Looks for .polemicrc config files.
 */
export class ConfigAdapter implements IConfigAdapter {
  readonly type = "config";
  files: IVFile[] = [];
  config: IProjectConfig | null = null;

  async load(repository: IRepository) {
    const explorer = cosmiconfig("polemic");
    const results = await explorer.search(repository.projectDir);

    if (results) {
      this.files = [
        { uri: results.filepath, content: JSON.stringify(results.config) },
      ];
    }
  }

  parse(repository: IRepository) {
    this.config = R.mergeDeepRight(
      defaultProjectConfig,
      R.mergeAll(this.files.map(({ content }) => JSON.parse(content)))
    );
  }
}

/**
 * Assets adapter.
 *
 * Looks for references to local files and copies them to an asset directory.
 */
export class AssetsAdapter implements IAssetsAdapter {
  readonly type = "assets";
  files: IVFile[] = [];
  assetDir: string = "";

  constructor({ assetDir }: IAssetsAdapterOptions) {
    this.assetDir = assetDir;
  }

  async load(repository: IRepository) {}

  async parse(repository: IRepository) {
    repository.documents?.documents.forEach((document) => {
      const { mdast, files } = parseLocalFiles(document.mdast, {
        assetDir: this.assetDir,
        projectDir: repository.projectDir,
      });
      document.mdast = mdast;
      this.files = [...this.files, ...files];
    });
  }
}

interface IAssetsAdapterOptions {
  assetDir: string;
}
