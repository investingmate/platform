import { ReactStaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";
import { CertificateStack } from "./CertificateStack";

export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);
  const { auth, domain } = use(AuthStack);
  const { bucket } = use(StorageStack);
  const { certificate, hostedZone, domain: certDomain } = use(CertificateStack);

  const site = new ReactStaticSite(stack, "frontend", {
    customDomain: {
      domainName: `app.${certDomain}`,
      domainAlias: `www.app.${certDomain}`,
      cdk: {
        hostedZone: { ...hostedZone },
        certificate: { ...certificate },
      },
    },
    path: "frontend",
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_BUCKET: bucket.bucketName,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      REACT_APP_AUTH_DOMAIN: domain.domainName,
    },
  });

  stack.addOutputs({
    SiteUrl: site.customDomainUrl || site.url,
  });
}
