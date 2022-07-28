/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../helpers'

const SidebarSearch: FC = () => {
  return (
    <form id='kt_sidebar_search_form' className='w-100 position-relative mb-5 mb-lg-10'>
      <input type='hidden' />

      <KTSVG
        path='/media/icons/duotune/general/gen021.svg'
        className='svg-icon-2 svg-icon-gray-700 position-absolute top-50 translate-middle-y ms-4'
      />

      <input
        type='text'
        className='form-control bg-transparent ps-13 fs-7 h-40px'
        name='search'
        placeholder='Search'
      />
    </form>
  )
}

export {SidebarSearch}
