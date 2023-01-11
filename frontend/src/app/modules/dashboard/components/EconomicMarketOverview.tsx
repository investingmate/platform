/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { IMSVG } from '../../../../_investingmate/helpers';
import { useQueryResponseData } from '../../companies/core/QueryResponseProvider';
import { useIntl } from 'react-intl';

type Props = {
  className: string;
  color: string;
};

const EconomicMarketOverview: React.FC<Props> = ({ className, color }) => {
  const companies = useQueryResponseData();
  const intl = useIntl();

  // TODO refactor this based on the data provider integration
  const indicators = [
    {
      id: 1,
      label: intl.formatMessage({ id: 'DASHBOARD.TOTAL_COMPANIES' }),
      sub_label: 'ASX',
      icon: '/media/icons/duotune/maps/map004.svg',
      data: `${companies.length}`,
    },
    {
      id: 2,
      label: intl.formatMessage({ id: 'DASHBOARD.SECTORS' }),
      sub_label: intl.formatMessage({ id: 'DASHBOARD.TOTAL_SECTORS' }),
      icon: '/media/icons/duotune/general/gen024.svg',
      data: '5',
    },
    {
      id: 3,
      label: intl.formatMessage({ id: 'DASHBOARD.CASH_RATE' }),
      sub_label: intl.formatMessage({ id: 'DASHBOARD.INTEREST_RATE' }),
      icon: '/media/icons/duotune/finance/fin010.svg',
      data: '7.3%',
    },
    {
      id: 4,
      label: 'CPI - Inflation',
      sub_label: intl.formatMessage({ id: 'DASHBOARD.CPI' }),
      icon: '/media/icons/duotune/ecommerce/ecm003.svg',
      data: '3.1%',
    },
    {
      id: 5,
      label: 'GDP',
      sub_label: intl.formatMessage({ id: 'DASHBOARD.GDP' }),
      // sub_label: intl.formatMessage({ id: 'DASHBOARD.GDP' }),trillion USD (2021)
      icon: '/media/icons/duotune/finance/fin001.svg',
      data: '1.553 ',
    },
  ];

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
          style={{ marginTop: '-170px' }}
        >
          {indicators.map((indicator) => {
            return (
              <div key={indicator.id} className='d-flex align-items-center mb-6'>
                <div className='symbol symbol-45px w-40px me-5'>
                  <span className='symbol-label bg-lighten'>
                    <IMSVG path={indicator.icon} className='svg-icon-1 svg-icon-primary' />
                  </span>
                </div>
                <div className='d-flex align-items-center flex-wrap w-100'>
                  <div className='mb-1 pe-3 flex-grow-1'>
                    <div className='fs-5 text-gray-800 fw-bold'>{indicator.label}</div>
                    <div className='text-gray-400 fw-semibold fs-7'>{indicator.sub_label}</div>
                  </div>
                  <div className='d-flex align-items-center'>
                    <div className='fw-bold fs-5 text-gray-800 pe-1'>{indicator.data}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { EconomicMarketOverview };
