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
import remarkRehype from "remark-rehype";

// Rehype plugins
import rehypeStringify from "rehype-stringify";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

import { ProjectConfig, Document } from "../types";
import { defaultProjectConfig } from "../helpers/config";
import {
  rehypeAddNodeId,
  rehypeAddSections,
  rehypeAssets,
  rehypeParagraphs,
  rehypeVideos,
} from "../helpers/rehype";
import { remarkLocalAssets, remarkImages } from "../helpers/remark";

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
      let hast: any;

      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkImages)
        .use(remarkMath)
        .use(remarkFrontmatter)
        .use(remarkLocalAssets, [
          {
            projectDir,
            assetDir: path.resolve(
              projectDir,
              ".polemic/parchment/public/assets"
            ),
          },
        ])
        .use(remarkRehype, {
          clobberPrefix: "",
        })
        .use(rehypeVideos)
        .use(rehypeKatex)
        .use(rehypeSlug)
        .use(rehypeAssets)
        .use(rehypeAddSections)
        .use(rehypeAddNodeId)
        .use(() => (tree) => {
          // TODO There must be a better way
          hast = tree;
        })
        .use(rehypeParagraphs)
        .use(rehypeStringify);

      const mdast = processor.parse(doc);

      processor.processSync(doc);

      return {
        md: doc,
        frontMatter: matter(doc).data,
        hast,
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
