import matter from "gray-matter";
import { unified } from "unified";
import yaml from "yaml";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkGemoji from "remark-gemoji";
import remarkSmartypants from "remark-smartypants";

import remarkSlugId from "./plugins/remarkSlugId";
import remarkImages from "./plugins/remarkImages";
import remarkVideos from "./plugins/remarkVideos";
import remarkCitation from "./plugins/remarkCitation";
import remarkSectionNumbering from "./plugins/remarkSectionNumbering";
import remarkFigureNumbering from "./plugins/remarkFigureNumbering";
import remarkEquationNumbering from "./plugins/remarkEquationNumbering";
import remarkTableNumbering from "./plugins/remarkTableNumbering";
import remarkParagraphs from "./plugins/remarkParagraphs";
import remarkSectionize from "./plugins/remarkSectionize";
import remarkId from "./plugins/remarkId";
import remarkLocalAssets from "./plugins/remarkLocalAssets";

export default async function parse(
  doc: string,
  { projectDir, assetDir, config }: ParseOptions
) {
  const frontMatter = matter(doc, {
    engines: { yaml: (s) => yaml.parse(s, { schema: "failsafe" }) },
  }).data;

  const processor = unified()
    .use(remarkParse)
    .use(remarkSmartypants, { dashes: "oldschool" })
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkSlugId)
    .use(remarkImages)
    .use(remarkVideos)
    .use(remarkMath)
    .use(remarkCitation, {
      bibliographyFile: frontMatter.bibliography || config?.bibliography,
      projectDir,
    })
    .use(remarkSectionNumbering)
    .use(remarkFigureNumbering)
    .use(remarkEquationNumbering)
    .use(remarkTableNumbering)
    .use(remarkFrontmatter)
    .use(remarkParagraphs)
    .use(remarkSectionize)
    .use(remarkId)
    .use(remarkLocalAssets, [
      {
        projectDir,
        assetDir,
      },
    ]);

  const mdast = await processor.run(processor.parse(doc));

  return {
    md: doc,
    frontMatter,
    mdast,
  };
}

interface ParseOptions {
  projectDir: string;
  assetDir: string;
  config: Record<string, any>;
}
