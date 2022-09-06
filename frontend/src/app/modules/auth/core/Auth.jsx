import { useState, useEffect, createContext, useContext, useRef } from "react";
import { Auth } from "aws-amplify";
import { LayoutSplashScreen } from "../../../../_investingmate/layout/core";
import * as authHelper from "./AuthHelpers";

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [auth] = useState(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState();

  const logout = async () => {
    await Auth.signOut();
    setCurrentUser(undefined);
  };

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
  );
};

const AuthInit = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { username, attributes } =
            await Auth.currentAuthenticatedUser();

          if (username) {
            setCurrentUser({ username, ...attributes });
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth) {
      requestUser();
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { useAuth, AuthProvider, AuthInit };
