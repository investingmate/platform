import {CompaniesListFilter} from './CompaniesListFilter'

const CompanyListToolbar = () => {
  return (
    <div className='d-flex justify-content-end' data-im-user-table-toolbar='base'>
      <CompaniesListFilter />
    </div>
  )
}

export {CompanyListToolbar}
