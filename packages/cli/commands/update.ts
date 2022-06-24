import path from "path";
import ora from "ora";
import cpy from "cpy";
import fs from "fs-extra";
import shelljs from "shelljs";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function updateCommand() {
  const projectDir = process.cwd();

  if (!fs.existsSync(path.resolve(projectDir, ".polemic"))) {
    console.log(
      chalk.red("Make sure you are in the root of a Polemic project.")
    );
    return;
  }

  const spinner = ora(`Updating your project`);
  spinner.start();

  const oldVersion = fs.readJsonSync(
    path.resolve(projectDir, ".polemic", "parchment", "package.json")
  ).version;

  // Copy Parchment project
  await cpy(
    path.resolve(__dirname, `../node_modules/@polemic/parchment/**`),
    path.resolve(projectDir, ".polemic", "parchment")
  );

  const newVersion = fs.readJsonSync(
    path.resolve(projectDir, ".polemic", "parchment", "package.json")
  ).version;

  const useYarn = Boolean(shelljs.which("yarn"));

  shelljs.cd(path.resolve(projectDir, ".polemic", "parchment"));
  shelljs.exec(
    `${useYarn ? "yarn" : "npm"} install`,
    { silent: true },
    async () => {
      spinner.succeed(
        `Project has been updated from ${chalk.green(
          `v${oldVersion}`
        )} to ${chalk.green(`v${newVersion}`)}`
      );
    }
  );
}
