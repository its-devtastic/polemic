import config from "./config.js";
import secrets from "./secrets.js";

export const getJwt = async (): Promise<string> => {
  const email = config.get("email");

  if (!email) {
    throw new Error("Email not found");
  }

  const jwt = await secrets.get(email);

  if (!jwt) {
    throw new Error("JWT token not found");
  }

  return jwt;
};
