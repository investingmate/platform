import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { MasterLayout } from "../../_investingmate/layout/MasterLayout";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../../_investingmate/assets/js/_utils";

const PrivateRoutes = () => {
  const CompaniesPage = lazy(() =>
    import("../modules/companies/CompaniesPage")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        <Route
          path="companies/*"
          element={
            <SuspensedView>
              <CompaniesPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView = ({ children }) => {
  const baseColor = getCSSVariableValue("--im-primary");
  TopBarProgress.config({
    barColors: {
      0: baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
