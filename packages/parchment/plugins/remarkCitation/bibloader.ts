import fs from "fs-extra";
import path from "path";
import glob from "glob";

/**
 * Finds and loads a bibliography file.
 *
 * There are a number of ways this file can be found:
 * 1. A `bibliography` key in the document's frontmatter.
 * 2. A `bibliography` key in the project's config file.
 * 3. A `.bib` file in the project root directory.
 */
export const loadBibFile = ({
  bibliographyFile,
  projectDir,
}: {
  bibliographyFile?: string;
  projectDir: string;
}): string => {
  let pathToBibFile: string;

  if (bibliographyFile) {
    pathToBibFile = path.resolve(projectDir, bibliographyFile);
  } else {
    pathToBibFile = glob.sync("*.bib", {
      cwd: projectDir,
      realpath: true,
      ignore: ["node_modules/**"],
      dot: false,
    })[0];
  }

  if (!pathToBibFile) {
    return "";
  }

  try {
    return fs.readFileSync(pathToBibFile, { encoding: "utf-8" });
  } catch (e) {
    console.log(`Could not find bibliography file located at ${pathToBibFile}`);
    return "";
  }
};
