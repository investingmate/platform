/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { IMSVG, toAbsoluteUrl } from '../../../../../_investingmate/helpers';
import { Company } from '../../core/_models';
import { useIntl } from 'react-intl';
import { defaultColumnsDescription } from '../table/columns/_columns';
import { Link, useLocation } from 'react-router-dom';
import { CompaniesIndicator } from '../CompaniesIndicator';
import { addToWatchlist, removeFromWatchlist } from '../../../../../utils/HelperFunctions';
import { getCurrentCompany } from '../../core/GetCurrentCompany';

const CompaniesHeader = () => {
  const intl = useIntl();
  const location = useLocation();
  const company = getCurrentCompany(location);

  const headlineArray =
    company && company.headline
      ? Object.entries(company.headline).map((entry) => {
          return {
            label: entry[0],
            value: entry[1],
          };
        })
      : [];

  const newList = localStorage.getItem('watchList');
  let watchState = false;
  if (newList && company) {
    const filtered = JSON.parse(newList).filter(
      (i: Company) => i && i.ticker === (company && company.ticker)
    );
    if (filtered.length > 0) {
      watchState = true;
    }
  }

  const [isOnWatchList, setIsOnWatchList] = useState(watchState);

  const handleWatchList = () => {
    setIsOnWatchList(!isOnWatchList);
    if (company && !isOnWatchList) {
      addToWatchlist(company);
    } else if (company && isOnWatchList) {
      removeFromWatchlist(company);
    }
  };

  return (
    <div className='card'>
      <div className='card-body p-5 pb-0 mb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <div className='mb-2'>
                    <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                      {company && company.logo.length > 0 ? (
                        <img src={toAbsoluteUrl(company.logo)} alt={`${company.name} logo`} />
                      ) : (
                        <IMSVG
                          path='/media/icons/duotune/general/gen006.svg'
                          className='svg-icon svg-icon-5x svg-icon-warning'
                        />
                      )}
                    </div>
                  </div>

                  <a
                    href={company && company.website}
                    className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'
                    target='_blank'
                    rel='noreferrer'
                  >
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
                  <span className='d-flex align-items-center text-gray-600 me-5'>
                    <span className='text-gray-900'>
                      {useIntl().formatMessage({ id: 'COMPANIES.EXCHANGE' })}:&nbsp;
                    </span>
                    {company && company.exchange}
                  </span>
                  <div className='separator-vertical' />
                  <span className='d-flex align-items-center text-gray-600 me-5'>
                    <span className='text-gray-900'>
                      {useIntl().formatMessage({ id: 'COMPANIES.TICKER' })}:&nbsp;
                    </span>
                    {company && company.ticker}
                  </span>
                  <span className='d-flex align-items-center text-gray-600 me-5'>
                    <span className='text-gray-900'>
                      {useIntl().formatMessage({ id: 'COMPANIES.SECTOR' })}:&nbsp;
                    </span>
                    {company && company.sector}
                  </span>
                </div>
              </div>

              <div className='d-flex my-4'>
                <div
                  onClick={() => handleWatchList()}
                  className={
                    !isOnWatchList
                      ? 'btn btn-sm btn-outline btn-outline-info'
                      : 'btn btn-sm btn-primary'
                  }
                  id='im_user_follow_button'
                >
                  {isOnWatchList ? (
                    <span className='indicator-label'>
                      <i className='fas fa-regular fa-star mx-2 fs-2' />
                      {intl.formatMessage({ id: 'COMPANIES.REMOVE_WATCHLIST' })}
                    </span>
                  ) : (
                    <span className='indicator-label text-info'>
                      <i className='fas fa-regular fa-star mx-2 fs-2 text-info' />
                      {intl.formatMessage({ id: 'COMPANIES.ADD_WATCHLIST' })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  {headlineArray.map((headline) => {
                    const colInfo = defaultColumnsDescription.find(
                      (col) => col.id === headline.label
                    );
                    return (
                      <div key={headline.label}>
                        <CompaniesIndicator
                          description={colInfo ? colInfo.description : ''}
                          label={headline.label}
                          value={headline.value}
                          // TODO we need to check how we will be able to define which arrow to show
                          status={headline.value % 2 === 0 ? 'UP' : 'DOWN'}
                          showGraph={true}
                        />
                      </div>
                    );
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
                state={{ company: JSON.stringify(company) }}
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
                state={{ company: JSON.stringify(company) }}
              >
                Financials
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { CompaniesHeader };
