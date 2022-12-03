import {Route, Routes, Outlet} from 'react-router-dom'
import {CompaniesListWrapper} from './components/CompaniesList'
import CompanyOverviewPage from "./CompanyOverviewPage";
import {PageLink, PageTitle} from "../../../_investingmate/layout/core/PageData";
import CompanyFinancialsPage from "./CompanyFinancialsPage";
import {DataDisclaimer} from "../../../components/DataDisclaimer";

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
  {
    title: 'Company financials',
    path: '/companies/company-financials',
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
              <PageTitle breadcrumbs={companiesBreadcrumbs}>Company Overview</PageTitle>
              <CompanyOverviewPage />
              <DataDisclaimer />
            </>
          }
        />
        <Route
          path='company-financials'
          element={
            <>
              <PageTitle breadcrumbs={companiesBreadcrumbs}>Company Financials</PageTitle>
              <CompanyFinancialsPage />
              <DataDisclaimer />
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
