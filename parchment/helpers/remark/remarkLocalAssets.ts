import { visit } from "unist-util-visit";
import path from "path";
import fs from "fs-extra";

/**
 * Remark plugin for adding support for local assets.
 *
 * Copies local assets included in the document to the
 * Parchment project's asset folder.
 */
export default function remarkLocalAssets([
  { projectDir, assetDir },
]: any): any {
  fs.ensureDirSync(assetDir);

  return (tree: any): any => {
    visit(tree, ["image", "video"], (node) => {
      if (node.url.startsWith("./")) {
        const src = path.resolve(projectDir, node.url);
        const dest = path.resolve(assetDir, node.url);

        fs.copyFileSync(src, dest);

        node.url = path.resolve("/assets", node.url);
      }
    });

    return tree;
  };
}
