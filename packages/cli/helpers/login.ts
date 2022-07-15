import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import axios from "axios";

import { POLEMIC_PUB_API } from "./constants.js";
import secrets from "./secrets.js";
import config from "./config.js";

export default async function login(email: string) {
  const spinner = ora().start("Requesting login token");

  await axios.post(`${POLEMIC_PUB_API}/auth/once`, {
    email,
  });

  spinner.succeed(`📬 A token was sent to ${email}.`);

  const { token } = await inquirer.prompt([
    { type: "input", name: "token", message: "Token" },
  ]);

  const r = await axios.post(`${POLEMIC_PUB_API}/auth/jwt`, {
    token,
  });

  if (r.status === 201) {
    const { accessToken } = r.data;
    await secrets.set(email, accessToken);
    config.set({ email });
    console.log(chalk.green(`🥳 You are now logged in as ${email}`));
  } else {
    console.log(chalk.red("Authentication was unsuccessful"));
  }
}
