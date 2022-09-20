import { CertificateStack } from "./CertificateStack";
import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { FrontendStack } from "./FrontendStack";
import { ConfigStack } from "./ConfigStack";
import { App } from "@serverless-stack/resources";

/**
 * @param {App} app
 */
export default function (app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app
    .stack(CertificateStack)
    .stack(StorageStack)
    .stack(ConfigStack)
    .stack(ApiStack)
    .stack(AuthStack)
    .stack(FrontendStack);
}
