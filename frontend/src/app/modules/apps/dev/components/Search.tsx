/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Questions} from './partials/Questions'
import {EnableSidebar} from '../../../../../_metronic/layout/core'

const Search: React.FC = () => {
  return (
    <EnableSidebar>
      <form id='kt_devs_search_form' className='form mb-6'>
        <div className='d-flex'>
          <input
            type='text'
            className='form-control flex-grow-1 me-5'
            placeholder='Enter search query'
            name='query'
          />
          <button type='submit' id='kt_devs_ask_submit' className='btn btn-primary flex-shrink-0'>
            Search Again
          </button>
        </div>
      </form>

      <div className='fw-bold fw-base text-gray-600'>56 results found for keyword “Laravel”</div>

      <div className='separator separator-dashed border-gray-300 my-6'></div>

      <Questions />
    </EnableSidebar>
  )
}

export {Search}
