import React from "react";
import Zoom from "react-medium-image-zoom";

import useConfig from "../hooks/useConfig";

const Img: React.FC<any> = ({ node, children, src, alt, title, ...props }) => {
  const { assetNumbering } = useConfig();

  return (
    <Zoom>
      <figure className="my-8 mx-auto w-2/3 space-y-2">
        <img
          src={src}
          alt={alt}
          {...props}
          className="rounded-md print:rounded-none"
        />
        <figcaption className="text-center leading-tight">
          {(alt || assetNumbering) && (
            <div className="text-md text-slate-600 italic font-bold">
              {assetNumbering ? `(${node.index}) ` : ""}
              {alt}
            </div>
          )}
          {title && (
            <div className="text-sm text-slate-400 font-sans">{title}</div>
          )}
        </figcaption>
      </figure>
    </Zoom>
  );
};

export default Img;
