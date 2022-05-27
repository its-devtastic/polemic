import React from "react";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Waypoint } from "react-waypoint";

import useConfig from "../hooks/useConfig";
import useToC from "../hooks/useToC";
import classNames from "classnames";

const Heading: React.FC<any> = ({ node, children, ...props }) => {
  const config = useConfig();
  const { changeActiveSection } = useToC();

  return (
    <Waypoint
      fireOnRapidScroll
      topOffset={100}
      onEnter={({ currentPosition, previousPosition }) => {
        if (
          currentPosition === Waypoint.inside &&
          previousPosition === Waypoint.above
        ) {
          changeActiveSection(-1);
        }
      }}
      onLeave={({ currentPosition, previousPosition }) => {
        if (
          currentPosition === Waypoint.above &&
          previousPosition === Waypoint.inside
        ) {
          changeActiveSection(props.id);
        }
      }}
    >
      {React.createElement(
        node.tagName,
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
              ["text-3xl font-bold text-slate-900"]: node.tagName === "h2",
              ["text-2xl font-bold text-slate-700"]: node.tagName === "h3",
              ["italic text-2xl text-slate-600"]: node.tagName === "h4",
              ["text-xl font-bold text-slate-500"]: node.tagName === "h5",
              ["italic text-xl text-slate-500"]: node.tagName === "h6",
            })}
          >
            {config.sectionNumbering
              ? [node.section, children].join(" ")
              : children}
          </span>
        </>
      )}
    </Waypoint>
  );
};

export default Heading;
