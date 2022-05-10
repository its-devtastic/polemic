import chalk from "chalk";
import shelljs from "shelljs";
import path from "path";

export default async function previewCommand() {
  console.log(chalk.blueBright.bold(`Starting preview`));

  const projectDir = process.cwd();
  const useYarn = Boolean(shelljs.which("yarn"));

  shelljs.cd(path.resolve(projectDir, ".polemic", "publisher"));

  shelljs.exec(`${useYarn ? "yarn" : "npm"} run dev`);
}
