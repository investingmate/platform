import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {AuthInit} from './modules/auth'
import {LayoutProvider, LayoutSplashScreen} from '../_investingmate/layout/core'
import {MasterInit} from '../_investingmate/layout/MasterInit'
import {I18nProvider} from "../_investingmate/i18n/i18nProvider";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
