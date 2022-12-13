import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { CertificateStack } from "./CertificateStack";
import { AuthStack } from "./AuthStack";

export function ApiStack({ stack, app }) {
  const { auth } = use(AuthStack);
  const { table, bucket } = use(StorageStack);
  const { certificate, hostedZone, domain } = use(CertificateStack);

  // Create the API
  const api = new Api(stack, "api", {
    customDomain: {
      domainName: `api.${domain}`,
      cdk: {
        hostedZone: { ...hostedZone },
        certificate: { ...certificate },
      },
      path: "v1",
    },
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
    },
    routes: {
      "GET /companies": "functions/companies/list.main",
      "GET /companies/{id}/indicators": "functions/companies/indicators.main",
    },
  });

  auth.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api,
    // Policy granting access to a specific folder in the bucket
    new PolicyStatement({
      actions: ["s3:*"],
      effect: Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
      ],
    }),
  ]);

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl || api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
