/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {IMSVG} from '../../../../../_investingmate/helpers'

const CompaniesListSearch = ({
    value: initialValue,
    onChange,
    debounce = 500,
  }: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1'>
        <IMSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-im-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder='Search company'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export {CompaniesListSearch}
