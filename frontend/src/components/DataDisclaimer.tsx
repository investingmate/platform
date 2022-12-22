import React from 'react';
import { useIntl } from 'react-intl';
import { CustomCard } from './CustomCard';

const DataDisclaimer = () => {
  const intl = useIntl();
  return (
    <div className='mt-6'>
      <CustomCard title={intl.formatMessage({ id: 'COMPANIES.DATA_DISCLAIMER' })}>
        <div className='d-flex rounded border-dashed border border-dashed p-6'>
          <div className='d-flex flex-stack flex-grow-1'>
            <div className='fw'>
              <div className='fs-7 text-gray-600'>
                <p>{intl.formatMessage({ id: 'COMPANIES.DATA_DISCLAIMER_INFO1' })}</p>
                <p>{intl.formatMessage({ id: 'COMPANIES.DATA_DISCLAIMER_INFO2' })}</p>
                <p className='mb-0'>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className='fw-bolder' href='https://investingmate.com.au/' target='_blank' rel="noreferrer">
                    {intl.formatMessage({ id: 'COMPANIES.READ_MORE' })}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export { DataDisclaimer };
