import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import path from "path";
import fs from "fs-extra";
import glob from "glob";
import { cosmiconfig } from "cosmiconfig";
import * as R from "ramda";
import parser from "@polemic/parser";
import { config, ConfigProvider, DocumentProvider } from "@polemic/react";

import { ProjectConfig, Document } from "../types";
import Page from "../components/Page";

const Home: NextPage<{
  docs: Document[];
  config: ProjectConfig;
}> = ({ docs, config }) => {
  return (
    <DocumentProvider docs={docs}>
      <ConfigProvider config={config}>
        <div className="font-sans text-base text-black antialiased selection:bg-yellow-100">
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Page />
        </div>
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

  process.env.POLEMIC_PARSER_ASSET_DIR = path.resolve(
    projectDir,
    ".polemic/parchment/public/assets"
  );

  const files = glob.sync("**/*.md", {
    cwd: projectDir,
    ignore: ["node_modules/**"],
    dot: false,
  });

  // Try to find a Polemic config file
  const explorer = cosmiconfig("polemic");
  const userConfig = await explorer.search(projectDir);

  const docs = files
    .map((file) => {
      const filePath = path.resolve(projectDir, file);

      return fs.readFileSync(filePath, { encoding: "utf-8" });
    })
    .map((doc) =>
      parser(doc, {
        projectDir,
        assetDir: path.resolve(projectDir, ".polemic/parchment/public/assets"),
        config: userConfig?.config,
      })
    );

  return {
    props: {
      docs: await Promise.all(docs),
      config: R.mergeDeepRight(
        config.defaultProjectConfig,
        userConfig?.config ?? {}
      ),
    },
  };
}
