// import * as route53 from "aws-cdk-lib/aws-route53";
// import * as route53Targets from "aws-cdk-lib/aws-route53-targets";
import { ReactStaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";
import { CertificateStack } from "./CertificateStack";

export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);
  const { auth, domain } = use(AuthStack);
  const { bucket } = use(StorageStack);
  const { certificate, hostedZone } = use(CertificateStack);

  const appPrefix = app.stage === "prod" ? "app" : app.stage + "-app";

  const site = new ReactStaticSite(stack, "frontend", {
    // customDomain: {
    //   domainName: `${appPrefix}.${domain}`,
    //   domainAlias: `www.${appPrefix}.${domain}`,
    //   cdk: {
    //     hostedZone,
    //     certificate,
    //   },
    // },
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

  // const recordProps = {
  //   recordName: `${appPrefix}.${domain}`,
  //   zone: hostedZone,
  //   target: route53.RecordTarget.fromAlias(
  //     new route53Targets.CloudFrontTarget(site.cdk.distribution)
  //   ),
  // };
  // new route53.ARecord(stack, "AlternateARecord", recordProps);
  // new route53.AaaaRecord(stack, "AlternateAAAARecord", recordProps);

  stack.addOutputs({
    SiteUrl: site.customDomainUrl || site.url,
  });
}
