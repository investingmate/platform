/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_investingmate/helpers'
import {Company} from "../../../core/_models";

type Props = {
  company: Company
}

const InfoCell: FC<Props> = ({company}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {/*{company.avatar ? (*/}
        {/*  <div className='symbol-label'>*/}
        {/*    <img src={toAbsoluteUrl(`/media/${company.avatar}`)} alt={company.name} className='w-100' />*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <div*/}
        {/*    className={clsx(*/}
        {/*      'symbol-label fs-3',*/}
        {/*      `bg-light-${company.initials?.state}`,*/}
        {/*      `text-${company.initials?.state}`*/}
        {/*    )}*/}
        {/*  >*/}
        {/*    {company.initials?.label}*/}
        {/*  </div>*/}
        {/*)}*/}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {company.name}
      </a>
      {/*<span>{company.email}</span>*/}
    </div>
  </div>
)

export {InfoCell}
