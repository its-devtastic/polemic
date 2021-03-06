import React, { useRef } from "react";
import {
  useWindowScroll,
  useWindowSize,
  useMouseHovered,
  useHoverDirty,
} from "react-use";
import * as R from "ramda";

const ReadingProgress: React.FC<{ documentHeight: number }> = ({
  documentHeight,
}) => {
  const ref = useRef(null);
  const { y } = useWindowScroll();
  const { height: windowHeight } = useWindowSize();
  const { elX, elW } = useMouseHovered(ref, { bound: true, whenHovered: true });
  const isHovering = useHoverDirty(ref);
  const progress: number = R.pipe(
    R.min<number>(100),
    R.max<number>(0),
    Math.ceil
  )(documentHeight && (100 * y) / (documentHeight - windowHeight));

  return (
    <div
      ref={ref}
      className="w-full fixed left-0 top-0 z-10 bg-slate-200 h-1 hover:h-3 cursor-pointer transition-[height] delay-500 hover:delay-[0ms] print:hidden"
      onClick={() =>
        window.scrollTo({
          top: ((documentHeight - windowHeight) * elX) / elW,
          behavior: "smooth",
        })
      }
    >
      <div
        className={`${
          progress < 100 ? "bg-red-300" : "bg-green-300"
        } h-full transition-[width] duration-100 absolute top-0 left-0`}
        style={{
          width: `${progress}%`,
        }}
      />
      {isHovering && (
        <div
          className="h-full bg-slate-400/40 absolute top-0 left-0"
          style={{
            width: `${(100 * elX) / elW}%`,
          }}
        />
      )}
    </div>
  );
};

export default ReadingProgress;
