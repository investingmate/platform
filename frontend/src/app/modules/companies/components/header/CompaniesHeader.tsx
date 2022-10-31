/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {IMSVG, toAbsoluteUrl} from '../../../../../_investingmate/helpers'
import {Company} from "../../core/_models";
import {useIntl} from "react-intl";
import {customStringfy} from "../../../../../utils/HelperFunctions";
import {defaultColumnsDescription} from "../table/columns/_columns";
import {CustomTooltip} from "../../../../../components/CustomTooltip";

interface CompanyHeaderProps {
  company: Company
}

const CompaniesHeader = (props: CompanyHeaderProps) => {
  const {company}=props
  console.log({company})

  const headlineArray = company && company.headline ?
  Object.entries(company.headline).map(entry => {
    return  {
      label: entry[0],
      value: entry[1]
    }
  }): []

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              {
                company.logo.length > 0 ?
                <img src={toAbsoluteUrl(company.logo)} alt={`${company.name} logo`} /> :
                <IMSVG
                  path="/media/icons/duotune/general/gen006.svg"
                  className="svg-icon svg-icon-5x svg-icon-warning"
                />
              }
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href={company.website} className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1' target="_blank" rel="noreferrer">
                    {company.name}
                  </a>
                  {/*<a href=''>*/}
                  {/*  <IMSVG*/}
                  {/*    path='/media/icons/duotune/general/gen026.svg'*/}
                  {/*    className='svg-icon-1 svg-icon-primary'*/}
                  {/*  />*/}
                  {/*</a>*/}
                  {/*<a*/}
                  {/*  href=''*/}
                  {/*  className='btn btn-sm btn-light-success fw-bolder ms-2 fs-8 py-1 px-3'*/}
                  {/*  data-bs-toggle='modal'*/}
                  {/*  data-bs-target='#im_modal_upgrade_plan'*/}
                  {/*>*/}
                  {/*  Upgrade to Pro*/}
                  {/*</a>*/}
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <span
                    className='d-flex align-items-center text-gray-600 me-5'
                  >
                    <span
                      className='text-gray-900'
                    >
                      {useIntl().formatMessage({id: 'COMPANIES.EXCHANGE'})}:&nbsp;
                    </span>
                    {company.exchange}
                  </span>
                  <div className="separator-vertical"/>
                  <span
                    className='d-flex align-items-center text-gray-600 me-5'
                  >
                    <span
                      className='text-gray-900'
                    >
                      {useIntl().formatMessage({id: 'COMPANIES.TICKER'})}:&nbsp;
                    </span>
                    {company.ticker}
                  </span>
                  <span
                    className='d-flex align-items-center text-gray-600 me-5'
                  >
                    <span
                      className='text-gray-900'
                    >
                      {useIntl().formatMessage({id: 'COMPANIES.SECTOR'})}:&nbsp;
                    </span>
                    {company.sector}
                  </span>
                </div>
              </div>

              {/*<div className='d-flex my-4'>*/}
              {/*  <a href='' className='btn btn-sm btn-light me-2' id='im_user_follow_button'>*/}
              {/*    <IMSVG*/}
              {/*      path='/media/icons/duotune/arrows/arr012.svg'*/}
              {/*      className='svg-icon-3 d-none'*/}
              {/*    />*/}

              {/*    <span className='indicator-label'>Follow</span>*/}
              {/*    <span className='indicator-progress'>*/}
              {/*      Please wait...*/}
              {/*      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>*/}
              {/*    </span>*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  {headlineArray.map((headline) => {
                    const colInfo = defaultColumnsDescription.find(col => col.id === headline.label)
                    return (
                      <CustomTooltip
                        description={colInfo && colInfo.description ? colInfo.description : ''}
                      >
                      <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                        <div className='d-flex align-items-center'>
                          {/*TODO we need to check how we will be able to define which arrow to show*/}
                          {headline.value % 2 === 0 ?
                            <IMSVG
                              path='/media/icons/duotune/arrows/arr066.svg'
                              className='svg-icon-3 svg-icon-success me-2'
                            />
                            :
                            <IMSVG
                              path='/media/icons/duotune/arrows/arr065.svg'
                              className='svg-icon-3 svg-icon-danger me-2'
                            />
                          }
                          <div className='fs-2 fw-bolder'>{headline.value}</div>
                        </div>
                          <div className='fw-bold fs-6 text-gray-400'>{customStringfy(headline.label)}</div>
                        </div>
                      </CustomTooltip>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {CompaniesHeader}
