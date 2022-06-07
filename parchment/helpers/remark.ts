import { visit } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";
import path from "path";
import fs from "fs-extra";
import isUrl from "is-url";

// Remark local assets support
export const remarkLocalAssets =
  ([{ projectDir, assetDir }]: any): any =>
  (tree: any): Promise<any> => {
    fs.ensureDirSync(assetDir);

    visit(tree, "image", (node) => {
      if (node.url.startsWith("./")) {
        const src = path.resolve(projectDir, node.url);
        const dest = path.resolve(assetDir, node.url);

        fs.copyFileSync(src, dest);

        node.url = path.resolve("/assets", node.url);
      }
    });

    return tree;
  };

// Remark simpler image syntax
const isImgPath = (value: string) =>
  value.startsWith("/") || value.startsWith("./") || value.startsWith("../");

export const defaultImageExtensions = [
  "svg",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "avif",
];

const imgExtRegex = new RegExp(`\\.(${defaultImageExtensions.join("|")})$`);
const isImgExt = (value: string) => imgExtRegex.test(value);

export const remarkImages = (): any => {
  return (tree: any) => {
    visitParents(tree, "text", (node, parents) => {
      const value = String(node.value).trim();

      if ((isUrl(value) || isImgPath(value)) && isImgExt(value)) {
        let length = parents.length;
        const parent = parents[length - 1];
        const siblings = parent.children;
        const index = siblings.indexOf(node);

        siblings[index] = {
          type: "image",
          url: value,
          title: null,
          alt: "",
          position: node.position,
        };
      }
    });
  };
};
