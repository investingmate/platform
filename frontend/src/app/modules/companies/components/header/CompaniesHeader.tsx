/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {IMSVG, toAbsoluteUrl} from '../../../../../_investingmate/helpers'
import {Company} from "../../core/_models";
import {useIntl} from "react-intl";
import {customStringfy} from "../../../../../utils/HelperFunctions";
import {defaultColumnsDescription} from "../table/columns/_columns";
import {CustomTooltip} from "../../../../../components/CustomTooltip";
import {Link, useLocation} from "react-router-dom";
import {Modal} from "react-bootstrap";
import {BarChartsWidget} from "../../../../../_investingmate/partials/widges/charts/BarChartsWidget";
import {LineChartsWidget} from "../../../../../_investingmate/partials/widges/charts/LineChartsWidget";

interface IHeadline {
  label: string
  value: number
}
const CompaniesHeader = () => {
  const [isOnWatchList, setIsOnWatchList] = useState(false);
  const [isLineGraphEnabled, setIsLineGraphEnabled] = useState(false);
  const [modal, setModal] = useState(false);
  const [headline, setHeadline] = useState<IHeadline | undefined>(undefined);

  const location = useLocation();
  let company: Company | undefined = undefined;
  let state: any;
  // getting the company details from state
  if(location && location.state){
    state = location.state
    if(state && state.company)
      company = state.company && JSON.parse(state.company);
  }

  console.log({company})

  const headlineArray = company && company.headline ?
  Object.entries(company.headline).map(entry => {
    return  {
      label: entry[0],
      value: entry[1]
    }
  }): []

  const handleWatchList = () => {
    // TODO save it on backend
    setIsOnWatchList(!isOnWatchList);
  }

  const handleModal = (headline: IHeadline) => {
    console.log('headline', headline)
    if(headline) {
      setModal(true)
      setHeadline(headline)
    }
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      {modal &&
        <Modal
          aria-hidden='true'
          dialogClassName='modal-dialog modal-dialog-centered'
          show={modal}
          onHide={()=>setModal(false)}
        >
          <div className="">
            <div className="modal-content">
              <div className="modal-header">
                {headline && headline.label && <h5 className="modal-title">{customStringfy(headline.label)}</h5>}
                <div
                  className="btn btn-icon btn-light-primary btn-custom ms-2"
                  onClick={()=>setModal(false)}
                  aria-label="Close"
                >
                  <IMSVG
                    path="/media/icons/duotune/arrows/arr061.svg"
                    className="svg-icon svg-icon-2x"
                  />
                </div>
              </div>
              <div className='card'>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <div className='card-title align-items-start flex-row'>
                    <div
                      className={
                        isLineGraphEnabled ?
                        "btn btn-icon btn-light-primary btn-active-primary active btn-custom ms-2" :
                        "btn btn-icon btn-light-primary btn-custom ms-2"
                      }
                      onClick={()=>setIsLineGraphEnabled(!isLineGraphEnabled)}
                    >
                      <i className="fas fa-regular fa-chart-line fs-2"></i>
                    </div>
                    <div
                      className={
                        !isLineGraphEnabled ?
                          "btn btn-icon btn-light-primary btn-active-primary active btn-custom ms-2" :
                          "btn btn-icon btn-light-primary btn-custom ms-2"
                      }
                      onClick={()=>setIsLineGraphEnabled(!isLineGraphEnabled)}
                    >
                      <i className="fas fa-regular fa-chart-bar fs-2"></i>
                    </div>
                  </div>

                  {/* begin::Toolbar */}
                  <div className='card-toolbar' data-im-buttons='true'>
                    <a
                      className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'
                      id='im_charts_widget_3_year_btn'
                    >
                      Year
                    </a>

                    <a
                      className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1'
                      id='im_charts_widget_3_month_btn'
                    >
                      Month
                    </a>

                    <a
                      className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'
                      id='im_charts_widget_3_week_btn'
                    >
                      Week
                    </a>
                  </div>
                  {/* end::Toolbar */}
                </div>
                {/* end::Header */}
              </div>
              <div className="modal-body">
                {isLineGraphEnabled ? <LineChartsWidget/> : <BarChartsWidget/>}
              </div>
            </div>
          </div>
        </Modal>
      }
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              {
                company && company.logo.length > 0 ?
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
                  <a href={company && company.website} className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1' target="_blank" rel="noreferrer">
                    {company && company.name}
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
                    {company && company.exchange}
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
                    {company && company.ticker}
                  </span>
                  <span
                    className='d-flex align-items-center text-gray-600 me-5'
                  >
                    <span
                      className='text-gray-900'
                    >
                      {useIntl().formatMessage({id: 'COMPANIES.SECTOR'})}:&nbsp;
                    </span>
                    {company && company.sector}
                  </span>
                </div>
              </div>

              <div className='d-flex my-4'>
                <div
                  onClick={()=>handleWatchList()}
                  className={
                    !isOnWatchList ?
                      'btn btn-sm btn-outline btn-outline-info' :
                      'btn btn-sm btn-primary'
                  }
                  id='im_user_follow_button'
                >
                  {
                    isOnWatchList ?
                    <span className='indicator-label'>
                      <i className="fas fa-regular fa-star mx-2 fs-2"/>
                      Remove from Watchlist
                    </span>
                    :
                    <span className='indicator-label text-info'>
                      <i className="fas fa-regular fa-star mx-2 fs-2 text-info"/>
                      Add to Watchlist
                    </span>
                  }
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  {headlineArray.map((headline) => {
                    const colInfo = defaultColumnsDescription.find(col => col.id === headline.label)
                    return (
                      <div
                        key={headline.label}
                      >
                        <div className='d-flex align-items-center justify-content-between border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                          <CustomTooltip
                            description={colInfo && colInfo.description ? colInfo.description : ''}
                          >
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
                          </CustomTooltip>
                          <div
                            role="button"
                            onClick={()=>handleModal(headline)}
                            className="min-w-55px d-flex align-items-center justify-content-end"
                          >
                            <div
                              className="btn btn-icon btn-light-primary btn-custom"
                            >
                              <i className="fas fa-regular fa-chart-line fs-2"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (window.location.pathname === '/companies/company-overview' && 'active')
                }
                to='/companies/company-overview'
                state={{company: JSON.stringify(company)}}
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (window.location.pathname === '/companies/company-financials' && 'active')
                }
                to='/companies/company-financials'
                state={{company: JSON.stringify(company)}}
              >
                Financials
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export {CompaniesHeader}
