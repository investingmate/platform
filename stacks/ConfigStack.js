import { Config } from "@serverless-stack/resources";

export function ConfigStack({ stack }) {
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");
  const GOOGLE_CLIENT_SECRET = new Config.Secret(stack, "GOOGLE_CLIENT_SECRET");
  const SENTRY_DNS = new Config.Secret(stack, "SENTRY_DNS");

  return {
    googleClientId: GOOGLE_CLIENT_ID,
    googleClientSecret: GOOGLE_CLIENT_SECRET,
    sentryDns: SENTRY_DNS,
  };
}
