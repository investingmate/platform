import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {AuthInit} from './modules/auth'
import {LayoutProvider, LayoutSplashScreen} from '../_investingmate/layout/core'
import {MasterInit} from '../_investingmate/layout/MasterInit'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <AuthInit>
          <Outlet />
          <MasterInit />
        </AuthInit>
      </LayoutProvider>
    </Suspense>
  )
}

export {App}
