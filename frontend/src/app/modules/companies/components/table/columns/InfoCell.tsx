/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Company} from "../../../core/_models";
import {IMSVG} from "../../../../../../_investingmate/helpers";

type Props = {
  company: Company
}

const InfoCell: FC<Props> = ({company}) => {
  return(
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
        <a href='#'>
          {company.logo.length > 0 ? (
            <div className='symbol-label'>
              <img src={company.logo} alt={company.name} className='w-100' />
            </div>
          ) : (
            <IMSVG
              path="/media/icons/duotune/general/gen006.svg"
              className="svg-icon svg-icon-3x svg-icon-warning"
            />
          )}
        </a>
      </div>
      <div className='d-flex flex-column'>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
          {company.name}
        </a>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
          {company.ticker}
        </a>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
          {company.sector}
        </a>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
          {company.exchange}
        </a>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
          {company.website}
        </a>
      </div>
    </div>
  )
}

export {InfoCell}
