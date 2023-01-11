import {
  UserPoolClientIdentityProvider,
  UserPoolIdentityProviderGoogle,
  ProviderAttribute,
} from "aws-cdk-lib/aws-cognito";
import { Cognito } from "@serverless-stack/resources";

export function AuthStack({ stack, app }) {
  const url =
    app.stage !== "local"
      ? `https://app.${app.stage}.investingmate.com.au`
      : "http://localhost:3000";

  const auth = new Cognito(stack, "auth", {
    login: ["email"],
    cdk: {
      userPoolClient: {
        supportedIdentityProviders: [UserPoolClientIdentityProvider.GOOGLE],
        oAuth: {
          callbackUrls: [url],
          logoutUrls: [url],
        },
      },
    },
  });

  const provider = new UserPoolIdentityProviderGoogle(stack, "Google", {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    userPool: auth.cdk.userPool,
    scopes: ["profile", "email", "openid"],
    attributeMapping: {
      email: ProviderAttribute.GOOGLE_EMAIL,
      givenName: ProviderAttribute.GOOGLE_GIVEN_NAME,
      familyName: ProviderAttribute.GOOGLE_FAMILY_NAME,
      profilePicture: ProviderAttribute.GOOGLE_PICTURE,
    },
  });

  auth.cdk.userPoolClient.node.addDependency(provider);

  // Create a cognito userpool domain
  const domain = auth.cdk.userPool.addDomain("AuthDomain", {
    cognitoDomain: {
      domainPrefix: `${app.stage}-investing-mate-auth-domain`,
    },
  });

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
    AuthDomain: domain.domainName,
  });
  // Return the auth resource
  return {
    auth,
    domain,
  };
}
