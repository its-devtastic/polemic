import * as R from "ramda";
import Head from "next/head";
import { useMeasure } from "react-use";

import useDocument from "../hooks/useDocument";

import ReadingProgress from "./ReadingProgress";
import Renderer from "./Renderer";
import Footnotes from "./Footnotes";

const Article = () => {
  const { activeDocument: doc } = useDocument();
  const [ref, { height, top }] = useMeasure();
  const frontMatter = doc?.frontMatter;

  return doc && frontMatter ? (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <ReadingProgress documentHeight={height + top} />
      <div ref={ref as any}>
        <div className="font-serif flex relative flex-col items-center p-4 tablet:p-12">
          <article className="w-full max-w-prose">
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

            <Renderer mdast={doc.mdast} />

            <Footnotes mdast={doc.mdast} />
          </article>
        </div>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center h-screen">
      No documents were found
    </div>
  );
};

export default Article;
