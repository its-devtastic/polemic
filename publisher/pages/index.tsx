import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import path from "path";
import fs from "fs-extra";
import glob from "glob";
import { cosmiconfig } from "cosmiconfig";
import * as R from "ramda";

import { ProjectConfig } from "../types";
import { defaultProjectConfig } from "../helpers/config";
import Article from "../components/Article";
import ConfigProvider from "../providers/ConfigProvider";

const Home: NextPage<{ docs: string[]; config: ProjectConfig }> = ({
  docs,
  config,
}) => {
  return (
    <ConfigProvider config={config}>
      <div className="font-serif text-base antialiased">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {config.type === "article" && docs[0] && <Article doc={docs[0]} />}
      </div>
    </ConfigProvider>
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

  const docs = files.map((file) => {
    const filePath = path.resolve(projectDir, file);

    return fs.readFileSync(filePath, { encoding: "utf-8" });
  });

  const explorer = cosmiconfig("polemic");

  const result = await explorer.search(projectDir);

  return {
    props: {
      docs,
      config: R.mergeDeepRight(defaultProjectConfig, result?.config ?? {}),
    },
  };
}
