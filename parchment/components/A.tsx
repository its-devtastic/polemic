import React from "react";
import isUrl from "is-url";

const A: React.FC<{ node: any; href: string }> = ({ node, href, ...props }) => {
  return (
    <a
      href={href}
      target={isUrl(href) ? "_blank" : undefined}
      rel={isUrl(href) ? "noreferrer noopener nofollow" : undefined}
      {...props}
      className="text-blue-700 underline"
    />
  );
};

export default A;
