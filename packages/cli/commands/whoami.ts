import ora from "ora";
import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

import { POLEMIC_PUB_API } from "../helpers/constants.js";
import secrets from "../helpers/secrets.js";
import config from "../helpers/config.js";
import login from "../helpers/login.js";

export default async function whoamiCommand() {
  const spinner = ora().start("Fetching user info");

  const email = config.get("email");

  if (!email) {
    spinner.info("You are not logged in 🤔");
    return;
  }

  const jwt = await secrets.get(email);

  if (!jwt) {
    spinner.fail("Could not find authentication token.");
    return;
  }

  try {
    const r = await axios.get(`${POLEMIC_PUB_API}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { email, username } = r.data;
    spinner.stop();
    console.log(chalk.blue(`👀 Logged in as ${username} (${email})`));
  } catch (e) {
    spinner.fail("Authentication failed.");

    const { sendToken } = await inquirer.prompt([
      {
        type: "confirm",
        message: `Send a new token to ${email}?`,
        name: "sendToken",
      },
    ]);

    if (sendToken) {
      await login(email);
    } else {
      await secrets.remove(email);

      config.delete("email");
      config.delete("username");
    }
  }
}