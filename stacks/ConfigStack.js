import { Config } from "@serverless-stack/resources";

export function ConfigStack({ stack }) {
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");

  return {
    GOOGLE_CLIENT_ID,
  };
}
