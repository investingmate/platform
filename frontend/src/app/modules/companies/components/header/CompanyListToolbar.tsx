import {IMSVG} from '../../../../../_investingmate/helpers'
import {useListView} from '../../core/ListViewProvider'
import {CompaniesListFilter} from './CompaniesListFilter'

const CompanyListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-im-user-table-toolbar='base'>
      <CompaniesListFilter />

      {/* begin::Export */}
      <button type='button' className='btn btn-light-primary me-3'>
        <IMSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Export
      </button>
      {/* end::Export */}

      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
        <IMSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add User
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {CompanyListToolbar}
