import React, {FC} from 'react'
import {MenuInner} from './MenuInner'

const Header: FC = () => {
  return (
    <div
      className='header-menu align-items-stretch'
      data-im-drawer='true'
      data-im-drawer-name='header-menu'
      data-im-drawer-activate='{default: true, lg: false}'
      data-im-drawer-overlay='true'
      data-im-drawer-width="{default:'200px', '300px': '250px'}"
      data-im-drawer-direction='end'
      data-im-drawer-toggle='#im_header_menu_mobile_toggle'
      data-im-swapper='true'
      data-im-swapper-mode='prepend'
      data-im-swapper-parent="{default: '#im_body', lg: '#im_header_nav'}"
    >
      <div
        className='menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch'
        id='#im_header_menu'
        data-im-menu='true'
      >
        <MenuInner />
      </div>
    </div>
  )
}

export {Header}
