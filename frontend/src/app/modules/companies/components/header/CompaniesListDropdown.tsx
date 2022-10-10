import React, {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../_investingmate/assets/ts/components'
import {initialQueryState, IMSVG} from '../../../../../_investingmate/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'

const CompaniesListDropDown = () => {
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [column, setColumn] = useState<string | undefined>()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {column},
      ...initialQueryState,
    })
  }

  return (
    <div>
      <button
        type='button'
        className='btn btn-light-primary me-3'
        data-im-menu-trigger='click'
        data-im-menu-placement='bottom-end'
        data-im-menu-flip='top-end'
      >
        <IMSVG
          path='/media/icons/duotune/general/gen052.svg'
          className='svg-icon-3 svg-icon-primary'
        />
      </button>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-300px'
        data-im-menu='true'
      >
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Columns selection</div>
        </div>
        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5' data-im-user-table-filter='form'>
          <div className='mb-10'>
            <div className='d-flex'>
              <label className='form-check form-check-sm form-check-custom form-check-solid me-5'>
                <input className='form-check-input' type='checkbox' value='1' />
                <span className='form-check-label'>Author</span>
              </label>

              <label className='form-check form-check-sm form-check-custom form-check-solid'>
                <input className='form-check-input' type='checkbox' value='2' defaultChecked={true} />
                <span className='form-check-label'>Customer</span>
              </label>
            </div>
          </div>

          <div className='d-flex justify-content-end'>
            <button
              type='button'
              disabled={isLoading}
              onClick={filterData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-im-menu-dismiss='true'
              data-im-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type='button'
              onClick={resetData}
              className='btn btn-primary fw-bold px-6'
              data-im-menu-dismiss='true'
              data-im-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {CompaniesListDropDown}
