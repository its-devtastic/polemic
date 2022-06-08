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

// Remark plugins
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import remarkGemoji from "remark-gemoji";
import remarkId from "../helpers/remark/remarkId";
import remarkSlugId from "../helpers/remark/remarkSlugId";
import remarkLocalAssets from "../helpers/remark/remarkLocalAssets";
import remarkImages from "../helpers/remark/remarkImages";
import remarkSections from "../helpers/remark/remarkSections";
import remarkVideos from "../helpers/remark/remarkVideos";
import remarkAssetNumbering from "../helpers/remark/remarkAssetNumbering";
import remarkEquationNumbering from "../helpers/remark/remarkEquationNumbering";
import remarkParagraphs from "../helpers/remark/remarkParagraphs";
import remarkSmartypants from "remark-smartypants";

import { ProjectConfig, Document } from "../types";
import { defaultProjectConfig } from "../helpers/config";

import Article from "../components/Article";
import TableOfContents from "../components/TableOfContents";

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
          <div className="font-sans text-base antialiased">
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <div className="flex w-full items-stretch">
              <div className="p-4 fixed w-[240px] h-full bg-white z-10 border-r border-slate-200 print:hidden hidden tablet:block">
                {config.tableOfContents && <TableOfContents />}
              </div>
              <div className="flex-1 tablet:pl-[240px]">
                <Article />
              </div>
            </div>
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

  const docs = files
    .map((file) => {
      const filePath = path.resolve(projectDir, file);

      return fs.readFileSync(filePath, { encoding: "utf-8" });
    })
    .map((doc) => {
      const processor = unified()
        .use(remarkParse)
        .use(remarkSmartypants, { dashes: "oldschool" })
        .use(remarkGfm)
        .use(remarkGemoji)
        .use(remarkId)
        .use(remarkSlugId)
        .use(remarkSections)
        .use(remarkImages)
        .use(remarkVideos)
        .use(remarkMath)
        .use(remarkAssetNumbering)
        .use(remarkEquationNumbering)
        .use(remarkFrontmatter)
        .use(remarkParagraphs)
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
        frontMatter: matter(doc).data,
        mdast,
      };
    });

  // Try to find a Polemic config file
  const explorer = cosmiconfig("polemic");
  const result = await explorer.search(projectDir);

  return {
    props: {
      docs,
      config: R.mergeDeepRight(defaultProjectConfig, result?.config ?? {}),
    },
  };
}
