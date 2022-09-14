import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { CertificateStack } from "./CertificateStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);
  const { certificate, hostedZone, domain } = use(CertificateStack);

  const apiPrefix = app.stage === "prod" ? "api" : app.stage + "-api";

  // Create the API
  const api = new Api(stack, "api", {
    customDomain: {
      domainName: `${apiPrefix}.${domain}`,
      cdk: {
        hostedZone: { ...hostedZone },
        certificate: { ...certificate },
      },
      path: "v1",
    },
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [table],
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

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl || api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
