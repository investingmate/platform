import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";

export function CertificateStack({ stack, app }) {
  const domain = "investingmate.com.au";

  const hostedZone = new route53.HostedZone(this, "HostedZone", {
    zoneName: domain,
  });

  const certificate = new acm.DnsValidatedCertificate(this, "Certificate", {
    hostedZone,
    domainName: domain,
    subjectAlternativeNames: [`*.${domain}`],
    validationDomains: {
      [domain]: domain,
      [`*.${domain}`]: domain,
    },
    validationMethod: acm.ValidationMethod.DNS,
  });

  return {
    certificate,
    hostedZone,
  };
}
