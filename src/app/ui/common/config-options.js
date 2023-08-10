const https = require("https");
const secrets = process.env;
import { SERVICES } from "./constant/services-constant";

const configOptions = {
  [SERVICES.ADMIN]: {
    baseURL: `${secrets.VAULT_CORE_URL}${secrets.VAULT_BASE_URL}`,
    headers: [{ ...TM_VAULT_HEADERS }],
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  },
};

module.exports = configOptions;
