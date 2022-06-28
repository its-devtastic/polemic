import { visit } from "unist-util-visit";
import path from "path";
import * as fs from "fs-extra";
import { INode, IVFile } from "@polemic/types";

export default function parseLocalFiles(
  mdast: INode,
  { assetDir, projectDir }: ParseLocalFilesOptions
) {
  const files: IVFile[] = [];

  visit(mdast, ["image", "video"], (node) => {
    if (node.url.startsWith("./")) {
      const src = path.resolve(projectDir, node.url);
      const dest = path.resolve(assetDir, node.url);

      files.push({ content: node.url, uri: src });

      fs.copyFileSync(src, dest);

      node.url = path.resolve("/assets", node.url);
    }
  });

  return { mdast, files };
}

interface ParseLocalFilesOptions {
  assetDir: string;
  projectDir: string;
}
