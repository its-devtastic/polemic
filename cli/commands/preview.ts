import chalk from "chalk";
import shelljs from "shelljs";
import path from "path";
import fs from "fs-extra";

export default async function previewCommand() {
  const projectDir = process.cwd();

  if (!fs.existsSync(path.resolve(projectDir, ".polemic"))) {
    console.log(
      chalk.red("Make sure you are in the root of a Polemic project.")
    );
    return;
  }

  console.log(chalk.blueBright.bold(`Starting preview`));

  const useYarn = Boolean(shelljs.which("yarn"));

  shelljs.cd(path.resolve(projectDir, ".polemic", "publisher"));

  shelljs.exec(`${useYarn ? "yarn" : "npm"} run dev`);
}
