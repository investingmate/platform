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

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-3'

const Topbar = () => {
  const {currentUser} = useAuth()

  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      {/* Quick links */}
      <div className={clsx('d-flex align-items-center', toolbarButtonMarginClass)}>
        {/* begin::Menu wrapper */}
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
