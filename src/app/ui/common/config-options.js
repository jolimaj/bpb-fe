const https = require("https");
const secrets = {
  // BPB_API_URL: "http://localhost:3001/",
  BPB_API_URL: "https://defiant-colt-shoulder-pads.cyclic.app/",
};
import { SERVICES } from "./constant/services-constant";

const configOptions = {
  [SERVICES.ADMIN]: {
    baseURL: `${secrets.BPB_API_URL}admin`,
    headers: [
      {
        "Access-Control-Allow-Origin": `${secrets.BPB_API_URL}admin`,
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods":
          "POST, PUT, PATCH, GET, DELETE, OPTIONS",
      },
    ],
  },
  [SERVICES.USER]: {
    baseURL: `${secrets.BPB_API_URL}account`,
    headers: [
      {
        "Access-Control-Allow-Origin": `${secrets.BPB_API_URL}admin`,
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods":
          "POST, PUT, PATCH, GET, DELETE, OPTIONS",
      },
    ],
  },
  [SERVICES.STAFF]: {
    baseURL: `${secrets.BPB_API_URL}account/departments`,
    headers: [
      {
        "Access-Control-Allow-Origin": `${secrets.BPB_API_URL}account/departments`,
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods":
          "POST, PUT, PATCH, GET, DELETE, OPTIONS",
      },
    ],
  },
  [SERVICES.MAIN]: {
    baseURL: secrets.BPB_API_URL,
    headers: [
      {
        "Access-Control-Allow-Origin": secrets.BPB_API_URL,
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
        "Access-Control-Allow-Credentials": true,
      },
    ],
  },
};

module.exports = configOptions;
