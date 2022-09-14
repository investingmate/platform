import { Api, use } from "@serverless-stack/resources";
import { CertificateStack } from "./CertificateStack";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { certificate, hostedZone } = use(CertificateStack);
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "api", {
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
    customDomain: {
      path: "v1",
      domainName: `${app.stage}_app.investingmate.com.au`,
      cdk: {
        hostedZone,
        certificate,
      },
    },
    routes: {
      "GET /companies": "functions/companies/list.main",
      "GET /companies/{id}/indicators": "functions/companies/indicators.main",
    },
  });

  // const recordProps = {
  //   recordName: `${app.stage}_api.investingmate.com.au`,
  //   zone: hostedZone,
  //   target: route53.RecordTarget.fromAlias(
  //     new route53Targets.CloudFrontTarget(api.cdk.distribution)
  //   ),
  // };

  // new route53.ARecord(stack, "AlternateARecord", recordProps);
  // new route53.AaaaRecord(stack, "AlternateAAAARecord", recordProps);

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl || api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
