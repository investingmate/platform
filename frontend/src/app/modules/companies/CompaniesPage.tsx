import {Route, Routes, Outlet} from 'react-router-dom'
import {CompaniesListWrapper} from './components/CompaniesList'
import CompanyOverviewPage from "./CompanyOverviewPage";
import {PageLink, PageTitle} from "../../../_investingmate/layout/core/PageData";

const companiesBreadcrumbs: Array<PageLink> = [
  {
    title: 'Companies',
    path: '/companies',
    isSeparator: false,
    isActive: false,
  },
  {
    title: 'Company overview',
    path: '/companies/overview/:ticker',
    isSeparator: true,
    isActive: false,
  },
]

const CompaniesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='companies'
          element={
            <>
              <PageTitle breadcrumbs={companiesBreadcrumbs}>Companies list</PageTitle>
              <CompaniesListWrapper />
            </>
          }
        />
        <Route
          path='overview/:ticker'
          element={
            <>
              <PageTitle breadcrumbs={companiesBreadcrumbs}>Company overview</PageTitle>
              <CompanyOverviewPage />
            </>
          }
        />
      </Route>
      <Route index element={<CompaniesListWrapper />} />
    </Routes>
  )
}

export default CompaniesPage
