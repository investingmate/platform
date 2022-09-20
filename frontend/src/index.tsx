import {createRoot} from 'react-dom/client'
import './_investingmate/assets/sass/style.scss'
import './_investingmate/assets/sass/plugins.scss'
import './_investingmate/assets/sass/style.react.scss'
import {Amplify} from 'aws-amplify'
import {initSentry} from './lib/errorLib'
import config from './config'
import {AuthProvider} from './app/modules/auth'
import {AppRoutes} from './app/routing/AppRoutes'
import {InvestingMateI18nProvider} from './_investingmate/i18n/InvestingMatei18n'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: {
      domain: `${config.cognito.AUTH_DOMAIN}.auth.${config.cognito.REGION}.amazoncognito.com`,
      scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: 'http://localhost:3000',
      redirectSignOut: 'http://localhost:3000',
      responseType: 'code',
    },
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'investingmate',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
})

initSentry()

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <InvestingMateI18nProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </InvestingMateI18nProvider>
  )
}
