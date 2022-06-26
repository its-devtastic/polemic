import * as R from "ramda";
import { useMeasure } from "react-use";
import dayjs from "dayjs";

import useDocument from "../hooks/useDocument";
import useConfig from "../hooks/useConfig";

import ReadingProgress from "./ReadingProgress";
import Renderer from "./Renderer";
import Footnotes from "./Footnotes";
import Bibliography from "./Bibliography";

const Article = () => {
  const { activeDocument: doc } = useDocument();
  const [ref, { height, top }] = useMeasure();
  const { localization } = useConfig();
  const frontMatter = doc?.frontMatter;

  return doc && frontMatter ? (
    <>
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
                    {dayjs(frontMatter.date).format(
                      localization.dateTimeFormat
                    )}
                  </div>
                )}
              </div>
            )}

            <Renderer mdast={doc.mdast} />

            <Footnotes mdast={doc.mdast} />

            <Bibliography mdast={doc.mdast} />
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
