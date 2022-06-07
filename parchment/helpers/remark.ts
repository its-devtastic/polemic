import { visit } from "unist-util-visit";
import path from "path";
import fs from "fs-extra";

export const remarkLocalAssets =
  ([{ projectDir, assetDir }]: any): any =>
  (tree: any): Promise<any> => {
    fs.ensureDirSync(assetDir);

    visit(tree, (node) => {
      if (node.type === "image" && node.url.startsWith("./")) {
        const src = path.resolve(projectDir, node.url);
        const dest = path.resolve(assetDir, node.url);

        fs.copyFileSync(src, dest);

        node.url = path.resolve("/assets", node.url);
      }
    });

    return tree;
  };
