import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../AssetHelpers'
import {FC} from 'react'
type Props = {
  className?: string
  path: string
  svgClassName?: string
}

const KTSVG: FC<Props> = ({className = '', path, svgClassName = 'mh-50px'}) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} />
    </span>
  )
}

export {KTSVG}
