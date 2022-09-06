import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AuthInit } from "./modules/auth";
import {
  LayoutProvider,
  LayoutSplashScreen,
} from "../_investingmate/layout/core";
import { MasterInit } from "../_investingmate/layout/MasterInit";
import { ErrorsPage } from "./modules/errors/ErrorsPage";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <ErrorsPage>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </ErrorsPage>
    </Suspense>
  );
};

export { App };
