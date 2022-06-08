import { visitParents } from "unist-util-visit-parents";
import isUrl from "is-url";

/**
 * Remark plugin to add support for a simpler image syntax.
 */
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

export default function remarkImages(): any {
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
}
