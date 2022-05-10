import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkFrontmatter from "remark-frontmatter";
import * as R from "ramda";
import matter from "gray-matter";

const Article = ({ doc }: { doc: string }) => {
  const [frontMatter, setFrontMatter] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const { data } = matter(doc);
      !R.isEmpty(data) && setFrontMatter(data);
    } catch (e) {}
  }, [doc]);

  return (
    <div className="flex relative flex-col items-center p-4 tablet:p-12">
      <div className="w-full max-w-prose prose prose-lg">
        {!R.isEmpty(frontMatter) && (
          <div className="text-center mb-24 mt-12">
            <h1 className="text-5xl mb-2">{frontMatter.title}</h1>
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

        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkFrontmatter]}
          rehypePlugins={[rehypeKatex]}
        >
          {doc}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Article;
