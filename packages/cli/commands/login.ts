import inquirer from "inquirer";

import login from "../helpers/login.js";

export default async function loginCommand() {
  const { email } = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "Your email address",
    },
  ]);

  await login(email);
}
