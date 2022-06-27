import React from "react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import useConfig from "../../hooks/useConfig";

const Heading: React.FC<any> = ({ node, children, ...props }) => {
  const config = useConfig();

  return React.createElement(
    `h${node.depth}`,
    {
      className: "group mb-4 mt-2 relative flex items-center",
      id: props.id,
    },
    <>
      <a
        href={`#${props.id}`}
        className="group-hover:block hover:block hidden absolute -translate-x-full text-md text-slate-400 px-1 cursor-pointer"
      >
        <FontAwesomeIcon icon={faLink} />
      </a>
      <span
        className={classNames({
          ["text-3xl font-bold text-slate-900"]: node.depth === 2,
          ["text-2xl font-bold text-slate-700"]: node.depth === 3,
          ["italic text-2xl text-slate-600"]: node.depth === 4,
          ["text-xl font-bold text-slate-500"]: node.depth === 5,
          ["italic text-xl text-slate-500"]: node.depth === 6,
        })}
      >
        {config.sectionNumbering
          ? [node.section, children].join(" ")
          : children}
      </span>
    </>
  );
};

export default Heading;
