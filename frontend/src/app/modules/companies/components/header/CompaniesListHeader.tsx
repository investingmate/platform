import {useListView} from '../../core/ListViewProvider'
import {CompanyListToolbar} from './CompanyListToolbar'
import {CompaniesListGrouping} from './CompaniesListGrouping'
import {CompaniesListSearchComponent} from './CompaniesListSearchComponent'

const CompaniesListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <CompaniesListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <CompaniesListGrouping /> : <CompanyListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {CompaniesListHeader}
