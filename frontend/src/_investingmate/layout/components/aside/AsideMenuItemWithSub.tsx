import {FC} from 'react'
import clsx from 'clsx'
import {useLocation} from 'react-router'
import {checkIsActive, IMSVG, WithChildren} from '../../../helpers'
import {useLayout} from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItemWithSub: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config

  return (
    <div
      className={clsx({show: isActive, hover: isActive}, 'menu-item menu-accordion')}
      data-im-menu-sub='accordion'
      data-im-menu-trigger='click'
    >
      <span className={clsx('menu-link', {active: isActive})}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <IMSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
        <span className='menu-arrow'></span>
      </span>
      <div className={clsx({show: isActive}, 'menu-sub menu-sub-accordion')}>{children}</div>
    </div>
  )
}

export {AsideMenuItemWithSub}
