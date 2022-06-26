import React from "react";
import Zoom from "react-medium-image-zoom";

import useConfig from "../../hooks/useConfig";
import { Tree } from "../../types";

const Img: React.FC<{ node: Tree }> = ({
  node: { url, alt, title, assetIndex },
  ...props
}) => {
  const { figureNumbering } = useConfig();

  return (
    <Zoom>
      <figure className="my-8 mx-auto w-2/3 space-y-2">
        <img
          src={url}
          alt={alt}
          {...props}
          className="rounded-md print:rounded-none"
        />
        <figcaption className="text-center leading-tight">
          {(alt || figureNumbering) && (
            <div className="text-md text-slate-600 italic font-bold">
              {figureNumbering ? `(${assetIndex}) ` : ""}
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
