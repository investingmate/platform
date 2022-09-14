import { ReactStaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";
import { CertificateStack } from "./CertificateStack";

import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";

export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);
  const { auth, domain } = use(AuthStack);
  const { bucket } = use(StorageStack);
  const { certificate, hostedZone } = use(CertificateStack);

  // Define our React app
  const site = new ReactStaticSite(stack, "frontend", {
    customDomain: {
      domainName: `${app.stage}_app.investingmate.com.au`,
      cdk: {
        hostedZone,
        certificate,
      },
    },
    path: "frontend",
    // Pass in our environment variables
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

  const recordProps = {
    recordName: `${app.stage}_app.investingmate.com.au`,
    zone: hostedZone,
    target: route53.RecordTarget.fromAlias(
      new route53Targets.CloudFrontTarget(site.cdk.distribution)
    ),
  };

  new route53.ARecord(stack, "AlternateARecord", recordProps);
  new route53.AaaaRecord(stack, "AlternateAAAARecord", recordProps);

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.customDomainUrl || site.url,
  });
}
