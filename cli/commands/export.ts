import ora from "ora";
import shelljs from "shelljs";
import path from "path";

export default async function exportCommand() {
  const spinner = ora(`Exporting your project...`);

  const projectDir = process.cwd();
  const useYarn = Boolean(shelljs.which("yarn"));

  shelljs.cd(path.resolve(projectDir, ".polemic", "parchment"));
  shelljs.exec(
    `${useYarn ? "yarn" : "npm"} run export`,
    {
      silent: true,
    },
    async () => {
      spinner.succeed();
    }
  );
}
