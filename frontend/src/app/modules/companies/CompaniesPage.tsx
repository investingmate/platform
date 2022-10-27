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
    path: '/companies/company-overview?ticker=:ticker',
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
              <PageTitle breadcrumbs={companiesBreadcrumbs}>Companies</PageTitle>
              <CompaniesListWrapper />
            </>
          }
        />
        <Route
          path='company-overview'
          element={
            <>
              <PageTitle breadcrumbs={companiesBreadcrumbs}>Company overview</PageTitle>
              <CompanyOverviewPage />
            </>
          }
        />
      </Route>
      <Route index element={
        <>
          <PageTitle breadcrumbs={[]}>Companies</PageTitle>
          <CompaniesListWrapper />
        </>
      } />
    </Routes>
  )
}

export default CompaniesPage
