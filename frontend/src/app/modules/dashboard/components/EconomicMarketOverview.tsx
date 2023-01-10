/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {IMSVG} from "../../../../_investingmate/helpers";
import {useQueryResponseData} from "../../companies/core/QueryResponseProvider";
import {useIntl} from "react-intl";

type Props = {
  className: string
  color: string
}

const EconomicMarketOverview: React.FC<Props> = ({className, color}) => {
  const companies = useQueryResponseData();
  const intl = useIntl();

  return (
    <div className={`card ${className}`}>
      <div className='card-body p-0'>
        <div className={`px-9 pt-7 card-rounded h-275px w-100 bg-${color}`}>
          <div className='d-flex flex-stack'>
            <h3 className='m-0 mt-6 text-white fw-bold fs-3'>
              {intl.formatMessage({ id: 'DASHBOARD.ECONOMIC_MARKET_OVERVIEW' })}
            </h3>
          </div>
        </div>
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body'
          style={{marginTop: '-170px'}}
        >
          <div className='d-flex align-items-center mb-6'>
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <IMSVG path='/media/icons/duotune/maps/map004.svg' className='svg-icon-1 svg-icon-primary' />
              </span>
            </div>
            <div className='d-flex align-items-center flex-wrap w-100'>
              <div className='mb-1 pe-3 flex-grow-1'>
                <div className='fs-5 text-gray-800 fw-bold'>
                  {intl.formatMessage({ id: 'DASHBOARD.TOTAL_COMPANIES' })}
                </div>
                <div className='text-gray-400 fw-semibold fs-7'>ASX</div>
              </div>
              <div className='d-flex align-items-center'>
                <div className='fw-bold fs-5 text-gray-800 pe-1'>{companies.length}</div>
              </div>
            </div>
          </div>
          <div className='d-flex align-items-center mb-6'>
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <IMSVG path='/media/icons/duotune/ecommerce/ecm003.svg' className='svg-icon-1 svg-icon-primary' />
              </span>
            </div>
            <div className='d-flex align-items-center flex-wrap w-100'>
              <div className='mb-1 pe-3 flex-grow-1'>
                <div className='fs-5 text-gray-800 fw-bold'>
                  CPI
                </div>
                <div className='text-gray-400 fw-semibold fs-7'>
                  {intl.formatMessage({ id: 'DASHBOARD.CPI' })}
                </div>
              </div>
              <div className='d-flex align-items-center'>
                <div className='fw-bold fs-5 text-gray-800 pe-1'>3.1%</div>
              </div>
            </div>
          </div>
          <div className='d-flex align-items-center mb-6'>
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <IMSVG path='/media/icons/duotune/finance/fin010.svg' className='svg-icon-1 svg-icon-primary' />
              </span>
            </div>
            <div className='d-flex align-items-center flex-wrap w-100'>
              <div className='mb-1 pe-3 flex-grow-1'>
                <div className='fs-5 text-gray-800 fw-bold'>
                  GDP
                </div>
                <div className='text-gray-400 fw-semibold fs-7'>
                  {intl.formatMessage({ id: 'DASHBOARD.GDP' })}
                </div>
                <div className='text-gray-400 fw-semibold fs-7'>trillion USD (2021)</div>
              </div>
              <div className='d-flex align-items-center'>
                <div className='fw-bold fs-5 text-gray-800 pe-1'>1.553</div>
              </div>
            </div>
          </div>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-45px w-40px me-5'>
              <span className='symbol-label bg-lighten'>
                <IMSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-1 svg-icon-primary' />
              </span>
            </div>
            <div className='d-flex align-items-center flex-wrap w-100'>
              <div className='mb-1 pe-3 flex-grow-1'>
                <div className='fs-5 text-gray-800 fw-bold'>
                  {intl.formatMessage({ id: 'DASHBOARD.SECTORS' })}
                </div>
                <div className='text-gray-400 fw-semibold fs-7'>
                  {intl.formatMessage({ id: 'DASHBOARD.TOTAL_SECTORS' })}
                </div>
              </div>
              <div className='d-flex align-items-center'>
                <div className='fw-bold fs-5 text-gray-800 pe-1'>10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {EconomicMarketOverview}
