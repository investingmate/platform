import clsx from 'clsx'
import {IMSVG, toAbsoluteUrl} from '../../../helpers'
import {
  // HeaderNotificationsMenu,
  HeaderUserMenu,
  // QuickLinks,
  // Search,
  // ThemeModeSwitcher,
} from '../../../partials'
import {useAuth} from '../../../../app/modules/auth'
import React, {useState} from "react";

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-3'

const Topbar = () => {
  const {currentUser} = useAuth()
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleFullscreen() {
    /* @ts-ignore*/
    const requestFullScreen = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen || document.documentElement.mozRequestFullScreen;
    /* @ts-ignore*/
    const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
    /* @ts-ignore*/
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
    if (isFullscreen) {
      return exitFullscreen.bind(document)();
    } else if (!isFullscreen) {
      return requestFullScreen.bind(document.documentElement)();
    }
  }

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Quick links */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Menu wrapper */}
        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary btn-custom position-relative mx-3',
            toolbarButtonHeightClass
          )}
          onClick={()=>{
            setIsExpanded(!isExpanded)
            toggleFullscreen()
          }}
        >
          {
            isExpanded ?
            <i className={`${toolbarButtonIconSizeClass}fas fa-solid fa-compress fs-1`}/> :
            <i className={`${toolbarButtonIconSizeClass}fas fa-solid fa-expand fs-1`}/>
          }
        </div>

        <div
          className={clsx(
            'btn btn-icon btn-active-light-primary btn-custom',
            toolbarButtonHeightClass
          )}
          data-im-menu-trigger='click'
          data-im-menu-attach='parent'
          data-im-menu-placement='bottom-end'
          data-im-menu-flip='bottom'
        >
          <IMSVG path='/media/flags/australia.svg' className={toolbarButtonIconSizeClass} />
        </div>
        {/* <QuickLinks /> */}
        {/* end::Menu wrapper */}
      </div>

      {/* begin::Theme mode */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* <ThemeModeSwitcher
          toggleBtnClass={clsx('btn-active-light-primary btn-custom', toolbarButtonHeightClass)}
        /> */}
      </div>
      {/* end::Theme mode */}

      {/* begin::User */}
      <div
        className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}
        id='im_header_user_menu_toggle'
      >
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', toolbarUserAvatarHeightClass)}
          data-im-menu-trigger='click'
          data-im-menu-attach='parent'
          data-im-menu-placement='bottom-end'
          data-im-menu-flip='bottom'
        >
          <img
            alt={`${currentUser?.given_name} ${currentUser?.family_name}`}
            src={currentUser?.picture || toAbsoluteUrl('/media/avatars/300-1.jpg')}
          />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}
    </div>
  )
}

export {Topbar}
