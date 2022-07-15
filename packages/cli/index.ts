#!/usr/bin/env ts-node-esm
import fs from "fs";
import path from "path";
import { program, Option } from "commander";
import { fileURLToPath } from "url";

import "./helpers/dotenv.js";
import createCommand from "./commands/create.js";
import exportCommand from "./commands/export.js";
import previewCommand from "./commands/preview.js";
import updateCommand from "./commands/update.js";
import loginCommand from "./commands/login.js";
import whoamiCommand from "./commands/whoami.js";
import logoutCommand from "./commands/logout.js";
import publishCommand from "./commands/publish.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./package.json"), "utf8")
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
  .addOption(
    new Option("-f, --format <format>").choices(["pdf", "html"]).default("pdf")
  )
  .description("Exports your Polemic project to PDF or a static HTML website.")
  .action(exportCommand);

program
  .command("preview")
  .description("Preview your Polemic project.")
  .action(previewCommand);

program
  .command("publish")
  .description("Publish your project to PolemicPub.")
  .action(publishCommand);

program
  .command("update")
  .description("Update your Polemic project.")
  .action(updateCommand);

program
  .command("login")
  .description("Log in to your PolemicPub account.")
  .action(loginCommand);

program
  .command("logout")
  .description("Log out current user.")
  .action(logoutCommand);

program
  .command("whoami")
  .description("Show user info of logged in user.")
  .action(whoamiCommand);

program.parse();
