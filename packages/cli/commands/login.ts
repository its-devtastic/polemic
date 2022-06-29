import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import axios from "axios";

import { POLEMIC_PUB_API } from "../helpers/constants.js";
import secrets from "../helpers/secrets.js";
import config from "../helpers/config.js";

export default async function loginCommand() {
  const { email } = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "Your email address",
    },
  ]);

  const spinner = ora().start("Requesting login token");

  await axios.post(`${POLEMIC_PUB_API}/api/passwordless/send-link`, {
    email,
  });

  spinner.succeed(`📬 A token was sent to ${email}.`);

  const { token } = await inquirer.prompt([
    { type: "input", name: "token", message: "Token" },
  ]);

  const r = await axios.get(`${POLEMIC_PUB_API}/api/passwordless/login`, {
    params: { loginToken: token },
  });

  if (r.status === 200) {
    const { email, username } = r.data.user;
    await secrets.set(email, r.data.jwt);
    config.set({ email, username });
    console.log(
      chalk.green(`🥳 You are now logged in as ${username} (${email})`)
    );
  } else {
    console.log(chalk.red("Authentication was unsuccessful"));
  }
}
