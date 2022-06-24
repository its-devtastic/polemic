import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import path from "path";
import fs from "fs-extra";
import glob from "glob";
import { cosmiconfig } from "cosmiconfig";
import * as R from "ramda";
import matter from "gray-matter";
import { unified } from "unified";
import yaml from "yaml";

// Remark plugins
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkGemoji from "remark-gemoji";
import remarkSmartypants from "remark-smartypants";
import remarkId from "../plugins/remarkId";
import remarkSlugId from "../plugins/remarkSlugId";
import remarkLocalAssets from "../plugins/remarkLocalAssets";
import remarkImages from "../plugins/remarkImages";
import remarkVideos from "../plugins/remarkVideos";
import remarkSectionNumbering from "../plugins/remarkSectionNumbering";
import remarkFigureNumbering from "../plugins/remarkFigureNumbering";
import remarkTableNumbering from "../plugins/remarkTableNumbering";
import remarkEquationNumbering from "../plugins/remarkEquationNumbering";
import remarkParagraphs from "../plugins/remarkParagraphs";
import remarkSectionize from "../plugins/remarkSectionize";
import remarkCitation from "../plugins/remarkCitation";

import { ProjectConfig, Document } from "../types";
import { defaultProjectConfig } from "../helpers/config";

import Article from "../components/Article";

import ConfigProvider from "../providers/ConfigProvider";
import DocumentProvider from "../providers/DocumentProvider";
import ToCProvider from "../providers/ToCProvider";

const Home: NextPage<{
  docs: Document[];
  config: ProjectConfig;
}> = ({ docs, config }) => {
  return (
    <DocumentProvider docs={docs}>
      <ConfigProvider config={config}>
        <ToCProvider>
          <div className="font-sans text-base text-black antialiased selection:bg-yellow-100">
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <Article />
          </div>
        </ToCProvider>
      </ConfigProvider>
    </DocumentProvider>
  );
};

export default Home;

export async function getStaticProps() {
  const projectDir = process.env.PROJECT_DIR || process.cwd();

  if (!projectDir) {
    return { props: { docs: ["Could not find project directory 😔"] } };
  }

  const files = glob.sync("**/*.md", {
    cwd: projectDir,
    ignore: ["node_modules/**"],
    dot: false,
  });

  // Try to find a Polemic config file
  const explorer = cosmiconfig("polemic");
  const config = await explorer.search(projectDir);

  const docs = files
    .map((file) => {
      const filePath = path.resolve(projectDir, file);

      return fs.readFileSync(filePath, { encoding: "utf-8" });
    })
    .map((doc) => {
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
          bibliographyFile:
            frontMatter.bibliography || config?.config.bibliography,
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
            assetDir: path.resolve(
              projectDir,
              ".polemic/parchment/public/assets"
            ),
          },
        ]);

      const mdast = processor.runSync(processor.parse(doc));

      return {
        md: doc,
        frontMatter,
        mdast,
      };
    });

  return {
    props: {
      docs,
      config: R.mergeDeepRight(defaultProjectConfig, config?.config ?? {}),
    },
  };
}
