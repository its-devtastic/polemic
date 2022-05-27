#!/usr/bin/env ts-node-esm
import fs from "fs";
import path from "path";
import { program, Option } from "commander";
import { fileURLToPath } from "url";

import createCommand from "./commands/create.js";
import exportCommand from "./commands/export.js";
import previewCommand from "./commands/preview.js";
import updateCommand from "./commands/update.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")
);

program
  .name("Polemic")
  .description(packageJson.description)
  .version(packageJson.version, "-v, --version");

program
  .command("create")
  .argument("<name>", "Name of your project")
  .addOption(
    new Option("-t, --template <template>")
      .choices(["book", "article", "blog"])
      .default("article")
  )
  .description("Create new Polemic project.")
  .action(createCommand);

program
  .command("export")
  .description("Exports your Polemic project to a static HTML website.")
  .action(exportCommand);

program
  .command("preview")
  .description("Preview your Polemic project.")
  .action(previewCommand);

program
  .command("update")
  .description("Update your Polemic project.")
  .action(updateCommand);

program.parse();
