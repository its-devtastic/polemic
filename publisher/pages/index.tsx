import React from "react";
import type { NextPage } from "next";
import path from "path";
import fs from "fs-extra";
import glob from "glob";

import Preview from "../components/Preview";

const Home: NextPage<{ docs: string[] }> = ({ docs }) => {
  return (
    <div className="font-serif text-base antialiased">
      <Preview doc={docs[0]} />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const projectDir = process.cwd();

  if (!projectDir) {
    return { props: { docs: ["Could not find project directory 😔"] } };
  }

  const files = glob.sync("**/*.md", { cwd: projectDir });

  const docs = files.map((file) => {
    const filePath = path.resolve(projectDir, file);

    return fs.readFileSync(filePath, { encoding: "utf-8" });
  });

  return { props: { docs } };
}
