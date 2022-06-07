import React from "react";

const Img: React.FC<any> = ({ node, children, src, alt, title, ...props }) => {
  return (
    <figure className="my-8 mx-auto w-2/3">
      <img src={src} alt={alt} {...props} className="mb-2" />
      {(alt || title) && (
        <figcaption className="text-center leading-tight">
          {alt && (
            <div className="text-md text-slate-600 italic font-bold">{alt}</div>
          )}
          {title && (
            <div className="text-sm text-slate-400 font-sans">{title}</div>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default Img;
