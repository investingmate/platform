import {CompaniesListFilter} from './CompaniesListFilter'
import {CompaniesListDropDown} from "./CompaniesListDropdown";

const CompanyListToolbar = () => {
  return (
    <div className='d-flex justify-content-end' data-im-user-table-toolbar='base'>
      <CompaniesListFilter />
      <CompaniesListDropDown />
    </div>
  )
}

export {CompanyListToolbar}
