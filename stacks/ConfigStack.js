import { Config } from "@serverless-stack/resources";

export function ConfigStack({ stack }) {
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");
  const SENTRY_DNS = new Config.Secret(stack, "SENTRY_DNS");

  return {
    GOOGLE_CLIENT_ID,
    SENTRY_DNS,
  };
}
