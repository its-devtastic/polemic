import React from "react";

import useConfig from "../../hooks/useConfig";
import { Tree } from "../../types";

const Video: React.FC<{ node: Tree }> = ({
  node: { url, title, assetIndex },
  ...props
}) => {
  const { figureNumbering } = useConfig();

  return (
    <div className="my-8 w-full space-y-2">
      <video
        controls
        preload="metadata"
        playsInline
        className="rounded-md print:rounded-none w-full"
      >
        <source
          src={url}
          type={`video/${url.split(".").slice(-1)[0]}`}
          {...props}
        />
      </video>
      <div className="text-center">
        {figureNumbering && (
          <div className="text-md text-slate-600 italic font-bold">{`(${assetIndex})`}</div>
        )}
        {title && (
          <div className="text-sm text-slate-400 font-sans">{title}</div>
        )}
      </div>
    </div>
  );
};

export default Video;
