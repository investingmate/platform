import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";

export function CertificateStack({ stack, app }) {
  const domain =
    app.stage === "prod"
      ? "investingmate.com.au"
      : `${app.stage}.investingmate.com.au`;

  let hostedZone = route53.HostedZone.fromLookup(stack, "HostedZone", {
    domainName: domain,
  });

  console.log("hostedZone", hostedZone);

  if (!hostedZone) {
    hostedZone = new route53.HostedZone(stack, "HostedZone", {
      zoneName: domain,
    });
  }

  const rootZone = route53.HostedZone.fromHostedZoneAttributes(stack, "Zone", {
    hostedZoneId: hostedZone.hostedZoneId,
    zoneName: domain,
  });

  const dnsCertificate = new acm.DnsValidatedCertificate(stack, "Certificate", {
    hostedZone,
    domainName: domain,
    subjectAlternativeNames: [`*.${domain}`],
    validation: acm.CertificateValidation.fromDns(hostedZone),
  });

  const certificate = acm.Certificate.fromCertificateArn(
    stack,
    "CertificateArn",
    dnsCertificate.certificateArn
  );

  stack.addOutputs({
    hostedZone: hostedZone.hostedZoneId,
    certificateArn: dnsCertificate.certificateArn,
  });

  return {
    certificate,
    hostedZone: rootZone,
    domain,
  };
}
