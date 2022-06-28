import { INode } from "@polemic/types";
import matter from "gray-matter";
import { unified } from "unified";
import yaml from "yaml";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkGemoji from "remark-gemoji";
import remarkSmartypants from "remark-smartypants";

import remarkSlugId from "../plugins/remarkSlugId";
import remarkImages from "../plugins/remarkImages";
import remarkVideos from "../plugins/remarkVideos";
import remarkSectionNumbering from "../plugins/remarkSectionNumbering";
import remarkFigureNumbering from "../plugins/remarkFigureNumbering";
import remarkEquationNumbering from "../plugins/remarkEquationNumbering";
import remarkTableNumbering from "../plugins/remarkTableNumbering";
import remarkParagraphs from "../plugins/remarkParagraphs";
import remarkSectionize from "../plugins/remarkSectionize";
import remarkId from "../plugins/remarkId";

export default async function parseMd(doc: string) {
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
    .use(remarkSectionNumbering)
    .use(remarkFigureNumbering)
    .use(remarkEquationNumbering)
    .use(remarkTableNumbering)
    .use(remarkFrontmatter)
    .use(remarkParagraphs)
    .use(remarkSectionize)
    .use(remarkId);

  const mdast = (await processor.run(processor.parse(doc))) as INode;

  return {
    md: doc,
    frontMatter,
    mdast,
  };
}
