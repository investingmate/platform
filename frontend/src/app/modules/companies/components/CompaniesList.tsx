import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {CompaniesListHeader} from './header/CompaniesListHeader'
import {CompaniesTable} from './table/CompaniesTable'
// import {UserEditModal} from './user-edit-modal/UserEditModal'
import {IMCard} from '../../../../_investingmate/helpers'

const CompaniesList = () => {
  console.log('CompaniesList')
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <IMCard>
        <CompaniesListHeader />
        <CompaniesTable />
      </IMCard>
      {/*{itemIdForUpdate !== undefined && <UserEditModal />}*/}
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
