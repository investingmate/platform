/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_investingmate/layout/core/PageData';
import { CompaniesListWrapper } from '../../modules/companies/components/CompaniesList';
import { DataDisclaimer } from '../../../components/DataDisclaimer';
import { CustomCard } from '../../../components/CustomCard';
import { NewsSection } from '../../modules/dashboard/components/NewsSection';
import { FinancialsIndicators } from '../../modules/dashboard/components/FinancialsIndicators';
import { dateFormatter } from '../../../utils/HelperFunctions';
import { ForeignExchangeTable } from '../../modules/dashboard/components/ForeignExchangeTable';

const DashboardPage: FC = () => {
  const intl = useIntl();
  return (
    <>
      <FinancialsIndicators />
      <CustomCard title={intl.formatMessage({ id: 'COMPANIES.WATCH_LIST' })}>
        <CompaniesListWrapper />
      </CustomCard>
      <div className='row'>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-6 h-100'>
            <NewsSection />
          </div>
        </div>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-6 h-100'>
            <div className='card-header align-items-center'>
              <h5 className='card-title fw-bolder'>
                {intl.formatMessage({ id: 'COMPANIES.FOREIGN_EXCHANGE' })}
              </h5>
              <span className='fs-8'>
                at {dateFormatter(new Date(), 'DD/mm/yyyy - hh:mm')} (AEDT)
              </span>
            </div>
            <div className='card-body pb-0'>
              <ForeignExchangeTable />
            </div>
          </div>
        </div>
      </div>
      <DataDisclaimer />
    </>
  );
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
