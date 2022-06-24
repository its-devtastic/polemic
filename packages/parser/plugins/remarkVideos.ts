import { visitParents } from "unist-util-visit-parents";
import isUrl from "is-url";

/**
 * Remark plugin to add support for a simpler image syntax.
 */
const isVideoPath = (value: string) =>
  value.startsWith("/") || value.startsWith("./") || value.startsWith("../");

export const defaultVideoExtensions = ["mov", "mp4", "mpg", "mpeg", "avi"];

const videoExtRegex = new RegExp(`\\.(${defaultVideoExtensions.join("|")})$`);
const isVideoExt = (value: string) => videoExtRegex.test(value);

export default function remarkVideos(): any {
  return (tree: any) => {
    visitParents(tree, "text", (node, parents) => {
      const value = String(node.value).trim();

      if ((isUrl(value) || isVideoPath(value)) && isVideoExt(value)) {
        let length = parents.length;
        const parent = parents[length - 1];
        const siblings = parent.children;
        const index = siblings.indexOf(node);

        siblings[index] = {
          type: "video",
          url: value,
          title: null,
          alt: "",
          position: node.position,
        };
      }
    });
  };
}
