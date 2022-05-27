import React, { useEffect, useMemo, useState } from "react";
import * as R from "ramda";

import { Tree } from "../types";

import useDocument from "../hooks/useDocument";

export const Context = React.createContext<{
  activeSection: string | null;
  headings: Tree[];
  changeActiveSection(sectionIdOrDiff: string | number): void;
}>({
  activeSection: null,
  headings: [],
  changeActiveSection() {},
});

export default function ToCProvider({ children }: any) {
  const { activeDocument } = useDocument();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headings = useMemo(
    () =>
      activeDocument?.hast.children.filter(
        R.where({
          tagName: R.includes(R.__, ["h2", "h3", "h4", "h5", "h6"]),
        })
      ) ?? [],
    [activeDocument]
  );

  useEffect(() => {
    window.history.pushState(
      null,
      "",
      activeSection ? `#${activeSection}` : window.location.pathname
    );
  }, [activeSection]);

  return (
    <Context.Provider
      value={{
        headings,
        activeSection,
        changeActiveSection: (sectionIdOrDiff: string | number) => {
          if (typeof sectionIdOrDiff === "string") {
            setActiveSection(sectionIdOrDiff);
          }
          if (typeof sectionIdOrDiff === "number") {
            const currentIdx = headings.findIndex(
              R.pathEq(["properties", "id"], activeSection)
            );
            const newIdx = currentIdx + sectionIdOrDiff;

            setActiveSection(
              newIdx >= 0
                ? headings[currentIdx + sectionIdOrDiff]?.properties.id ?? null
                : null
            );
          }
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
