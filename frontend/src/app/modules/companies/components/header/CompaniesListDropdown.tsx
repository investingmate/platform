import React, {useEffect} from 'react'
import {MenuComponent} from '../../../../../_investingmate/assets/ts/components'
import { IMSVG} from '../../../../../_investingmate/helpers'
import {TColumn} from "../../core/_models";

interface ICompaniesListDropdown {
  columns: TColumn[],
  setColumns: (columns: any) => void
}
const CompaniesListDropDown = (props: ICompaniesListDropdown) => {
  const {columns, setColumns} = props;

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  // update the status of the column
  const handleChange = (col: TColumn) => {
    const updatedCols = columns.map((c) => {
      if (col.id === c.id){
        c.status = !c.status
      }
      return c
    })
    setColumns(updatedCols)
  }

  return (
    <div>
      <button
        type='button'
        className='btn btn-light-primary'
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
        <div className='separator border-gray-200'/>

        <div className='px-7 py-5' data-im-user-table-filter='form'>
          <div className='mb-10'>
            <div className='d-flex flex-wrap'>
              {
                columns.map((col) => {
                  if(col && col.header && col.header.length > 0){
                    return (
                      <label key={col.id} className='m-3 form-check form-check-sm form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value={col.id}
                          checked={col.status}
                          onChange={() => handleChange(col)}
                        />
                        <span className='form-check-label'>{`${col.header}`}</span>
                      </label>
                    )
                  }
                  return null
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {CompaniesListDropDown}
