import { StaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";
import { CertificateStack } from "./CertificateStack";

export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);
  const { auth, domain: authDomain } = use(AuthStack);
  const { bucket } = use(StorageStack);
  const { certificate, hostedZone, domain } = use(CertificateStack);

  const appDomain =
    app.stage === "local" ? "http://localhost:3000" : `https://app.${domain}`;

  new StaticSite(stack, "frontend", {
    customDomain: {
      domainName: `app.${domain}`,
      cdk: {
        hostedZone: { ...hostedZone },
        certificate: { ...certificate },
      },
    },
    path: "frontend",
    buildOutput: "build",
    buildCommand: "npm run build",
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_BUCKET: bucket.bucketName,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      REACT_APP_AUTH_DOMAIN: authDomain.domainName,
      REACT_APP_DOMAIN: appDomain,
    },
  });
}
