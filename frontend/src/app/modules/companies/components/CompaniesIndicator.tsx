/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {IMSVG} from '../../../../_investingmate/helpers'
import {customStringfy} from "../../../../utils/HelperFunctions";
import {CustomOverlayInfo} from "../../../../components/CustomOverlayInfo";

interface Props {
  description: string | undefined;
  value: number;
  label: string;
  status?: string;
  children?: React.ReactNode
}

const CompaniesIndicator = (props: Props) => {
  const { description, value, label, children, status } = props;

  return (
    <div className='d-flex align-items-center justify-content-between border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
      <div>
        <div className='d-flex align-items-center'>
          {status === 'UP' &&
            <IMSVG
              path='/media/icons/duotune/arrows/arr066.svg'
              className='svg-icon-3 svg-icon-success me-2'
            />
          }
          {status === 'DOWN' &&
            <IMSVG
              path='/media/icons/duotune/arrows/arr065.svg'
              className='svg-icon-3 svg-icon-danger me-2'
            />
          }
          <div className='fs-2 fw-bolder'>{value}</div>

          <CustomOverlayInfo description={description ?? ''} />
        </div>
        <div className='fw-bold fs-6 text-gray-400'>{customStringfy(label)}</div>
      </div>
      {children && children}
    </div>
  )
}

export {CompaniesIndicator}
