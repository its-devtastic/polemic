import keytar from "keytar";

import { NAMESPACE } from "./constants.js";

const secrets = {
  set: (account: string, value: any) =>
    keytar.setPassword(NAMESPACE, account, JSON.stringify(value)),
  get: async (account: string): Promise<any> =>
    JSON.parse((await keytar.getPassword(NAMESPACE, account)) ?? ""),
  remove: async (account: string): Promise<any> =>
    keytar.deletePassword(NAMESPACE, account),
};

export default secrets;
