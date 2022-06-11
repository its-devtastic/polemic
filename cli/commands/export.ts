import ora from "ora";
import shelljs from "shelljs";
import path from "path";
import fs from "fs-extra";
import cpy from "cpy";

export default async function exportCommand() {
  const spinner = ora(`Exporting your project...`);
  spinner.start();

  const projectDir = process.cwd();
  const useYarn = Boolean(shelljs.which("yarn"));

  shelljs.cd(path.resolve(projectDir, ".polemic", "parchment"));
  shelljs.exec(
    `PROJECT_DIR=${projectDir} ${useYarn ? "yarn" : "npm"} run export`,
    {
      silent: true,
    },
    async () => {
      const buildDir = path.resolve(projectDir, ".polemic", "parchment", "out");
      const exportDir = path.resolve(projectDir, "export", "html");

      await fs.remove(exportDir);
      await cpy(`${buildDir}/**`, exportDir, {
        overwrite: true,
      });
      spinner.succeed();
    }
  );
}
