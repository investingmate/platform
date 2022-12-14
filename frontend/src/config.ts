const config = {
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
    AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  SENTRY_DNS: 'https://6d806f0cd4be45c3903c528d830b89f5@o1352644.ingest.sentry.io/6634155',
  STRIPE_KEY: '',
}

export default config
