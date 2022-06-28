import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import path from "path";
import { ConfigProvider, DocumentProvider } from "@polemic/react";
import { Repository } from "@polemic/binder";
import {
  DocumentsAdapter,
  ConfigAdapter,
  BibliographyAdapter,
  AssetsAdapter,
} from "@polemic/binder/adapters/fs";
import { IParsedDocument } from "@polemic/types";

import { ProjectConfig } from "../types";
import Page from "../components/Page";

const Home: NextPage<{
  docs: IParsedDocument[];
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

  const assetDir = path.resolve(projectDir, ".polemic/parchment/public/assets");

  const repository = new Repository({
    projectDir,
    adapters: [
      new ConfigAdapter(),
      new DocumentsAdapter(),
      new BibliographyAdapter(),
      new AssetsAdapter({ assetDir }),
    ],
  });

  await repository.initialize();

  return {
    props: {
      docs: repository.documents?.documents,
      config: repository.config?.config,
    },
  };
}
