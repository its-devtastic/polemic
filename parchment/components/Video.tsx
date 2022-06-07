import React from "react";

import useConfig from "../hooks/useConfig";

const Video: React.FC<any> = ({ node, children, src, title, ...props }) => {
  const { assetNumbering } = useConfig();

  return (
    <div className="my-8 w-full space-y-2">
      <video
        controls
        preload="metadata"
        playsInline
        className="rounded-md print:rounded-none w-full"
      >
        <source
          src={src}
          type={`video/${src.split(".").slice(-1)[0]}`}
          {...props}
        />
      </video>
      <div className="text-center">
        {assetNumbering && (
          <div className="text-md text-slate-600 italic font-bold">{`(${node.index})`}</div>
        )}
        {title && (
          <div className="text-sm text-slate-400 font-sans">{title}</div>
        )}
      </div>
    </div>
  );
};

export default Video;
