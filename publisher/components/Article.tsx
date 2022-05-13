import * as R from "ramda";
import Head from "next/head";

import { Document } from "../types";
import ReadingProgress from "./ReadingProgress";
import Renderer from "./Renderer";
import { useMeasure } from "react-use";

const Article = ({ doc }: { doc: Document }) => {
  const [ref, { height, top }] = useMeasure();
  const { frontMatter } = doc;

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <ReadingProgress documentHeight={height + top} />
      <div ref={ref as any}>
        <div className="flex relative flex-col items-center p-4 tablet:p-12 scroll-smooth">
          <div className="w-full max-w-prose">
            {!R.isEmpty(frontMatter) && (
              <div className="text-center mb-24 mt-12">
                <h1 className="text-5xl mb-2 font-bold text-slate-900">
                  {frontMatter.title}
                </h1>
                {frontMatter.subtitle && (
                  <h2 className="text-2xl text-slate-500 mt-0 mb-12 font-normal italic">
                    {frontMatter.subtitle}
                  </h2>
                )}
                {frontMatter.author && (
                  <div className="text-xl text-slate-600 mb-6">
                    {frontMatter.author}
                  </div>
                )}
                {frontMatter.date && (
                  <div className="text-xl text-slate-600 mb-6">
                    {frontMatter.date}
                  </div>
                )}
              </div>
            )}

            <Renderer hast={doc.hast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
