import Head from "next/head";

import { useDocument, Article } from "@polemic/react";

const Page = () => {
  const { activeDocument: doc } = useDocument();
  const frontMatter = doc?.frontMatter;

  return doc && frontMatter ? (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <Article />
    </>
  ) : null;
};

export default Page;
