import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {CompaniesListWrapper} from './components/CompaniesList'
import {PageLink, PageTitle} from "../../../_investingmate/layout/core/PageData";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/apps/user-management/users',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const CompaniesPage = () => {
  console.log('render')
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='companies-list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Companies list</PageTitle>
              <CompaniesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/companies/companies-list' />} />
    </Routes>
  )
}

export default CompaniesPage
