import { FC, lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import { MasterLayout } from '../../_investingmate/layout/MasterLayout';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';
import { getCSSVariableValue } from '../../_investingmate/assets/ts/_utils';
import { WithChildren } from '../../_investingmate/helpers';
import { PathsConstants } from '../../utils/PathsConstants';

const PrivateRoutes = () => {
  const CompaniesPage = lazy(() => import('../modules/companies/CompaniesPage'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registration */}
        <Route
          path={`${PathsConstants.AUTH}/*`}
          element={<Navigate to={`/${PathsConstants.DASHBOARD}`} />}
        />
        {/* Pages */}
        <Route path={PathsConstants.DASHBOARD} element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        <Route
          path={`${PathsConstants.COMPANIES}/*`}
          element={
            <SuspensedView>
              <CompaniesPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to={`/${PathsConstants.ERROR_404}`} />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--im-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
