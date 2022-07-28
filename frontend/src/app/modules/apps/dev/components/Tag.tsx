/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Questions} from './partials/Questions'
import {EnableSidebar} from '../../../../../_metronic/layout/core'

const Tag: React.FC = () => {
  return (
    <EnableSidebar>
      <Questions />
    </EnableSidebar>
  )
}

export {Tag}
