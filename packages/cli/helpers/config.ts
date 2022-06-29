import Configstore from "configstore";

import { NAMESPACE } from "./constants.js";

const config = new Configstore(NAMESPACE, {});

export default config;
