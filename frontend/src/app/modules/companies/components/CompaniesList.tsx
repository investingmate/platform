import {ListViewProvider} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {CompaniesListHeader} from './header/CompaniesListHeader'
import {CompaniesTable} from './table/CompaniesTable'
import {IMCard} from '../../../../_investingmate/helpers'

const CompaniesList = () => {
  return (
    <>
      <IMCard>
        <CompaniesListHeader />
        <CompaniesTable />
      </IMCard>
    </>
  )
}

const CompaniesListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CompaniesList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CompaniesListWrapper}
