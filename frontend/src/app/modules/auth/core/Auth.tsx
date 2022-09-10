import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {Auth} from 'aws-amplify'
import {LayoutSplashScreen} from '../../../../_investingmate/layout/core'
import * as authHelper from './AuthHelpers'
import {UserModel} from './_models'
import {WithChildren} from '../../../../_investingmate/helpers'

type AuthContextProps = {
  auth: boolean | undefined
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth] = useState<boolean>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()

  const logout = async () => {
    await Auth.signOut()
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        currentUser,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const {username, attributes} = await Auth.currentAuthenticatedUser()

          if (username) {
            setCurrentUser({username, ...attributes})
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth) {
      requestUser()
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {useAuth, AuthProvider, AuthInit}
