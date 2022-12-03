import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "./CustomCard";

const DataDisclaimer = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.DATA_DISCLAIMER'})}>
      <div className='fw'>
        <div className='fs-7 text-gray-600'>
          <p>
            {intl.formatMessage({id: 'COMPANIES.DATA_DISCLAIMER_INFO1'})}
          </p>
          <p>
            {intl.formatMessage({id: 'COMPANIES.DATA_DISCLAIMER_INFO2'})}
          </p>
          <p className="mb-0">
            <a className='fw-bolder' href='#'>
              {intl.formatMessage({id: 'COMPANIES.READ_MORE'})}
            </a>
          </p>
        </div>
      </div>
    </CustomCard>
  )
}

export {DataDisclaimer}
