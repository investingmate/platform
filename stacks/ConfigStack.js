import { Config } from "@serverless-stack/node/config";

export function ConfigStack({ stack }) {
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");
  const GOOGLE_CLIENT_SECRET = new Config.Secret(stack, "GOOGLE_CLIENT_SECRET");
  const SENTRY_DNS = new Config.Secret(stack, "SENTRY_DNS");

  return {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    SENTRY_DNS,
  };
}
