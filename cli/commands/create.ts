import path from "path";
import ora from "ora";
import cpy from "cpy";
import glob from "glob";
import pupa from "pupa";
import fs from "fs-extra";
import shelljs from "shelljs";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function createCommand(
  name: string,
  { template }: CreateOptions
) {
  const spinner = ora(`Creating a new project for your ${template}`);
  spinner.start();

  const destination = path.resolve(process.cwd(), name);

  // Copying template files
  await cpy(
    path.resolve(__dirname, `../../templates/${template}`),
    destination,
    {
      rename: (basename) => {
        const match = basename.match(/{(.+)}/)?.[1] as "name" | "template";

        return Boolean(match) ? { name, template }[match] : basename;
      },
    }
  );

  const files = glob.sync("**/*", { cwd: destination });

  // Replace variables in template files
  for (const file of files) {
    const filePath = path.resolve(destination, file);
    const input = fs.readFileSync(filePath, { encoding: "utf-8" });
    const output = pupa(input, { name, template });

    fs.writeFileSync(filePath, output);
  }

  // Create directories
  fs.ensureDirSync(path.resolve(destination, ".polemic", "parchment"));

  // Copy Parchment project
  await cpy(
    path.resolve(__dirname, `../../parchment/**`),
    path.resolve(destination, ".polemic", "parchment")
  );

  const useYarn = Boolean(shelljs.which("yarn"));

  shelljs.cd(path.resolve(destination, ".polemic", "parchment"));
  shelljs.exec(
    `${useYarn ? "yarn" : "npm"} install`,
    { silent: true },
    async () => {
      spinner.succeed("Project has been created!");
      console.log(chalk.blue(`A new folder named ${name} has been created.`));
      console.log(
        chalk.blue(`Inside the project directory run `) +
          chalk.blue.bold("polemic preview")
      );
    }
  );
}

interface CreateOptions {
  template: "article" | "blog" | "book";
}
