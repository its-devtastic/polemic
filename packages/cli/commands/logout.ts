import ora from "ora";

import secrets from "../helpers/secrets.js";
import config from "../helpers/config.js";

export default async function logoutCommand() {
  const spinner = ora().start("Logging out current user");

  const email = config.get("email");

  if (!email) {
    config.delete("username");
    spinner.info("You are not logged in 🤔");
    return;
  }

  await secrets.remove(email);

  config.delete("email");
  config.delete("username");

  spinner.succeed("You have been logged out 👋");
}
