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
import { QueryRequestProvider } from '../../modules/companies/core/QueryRequestProvider';
import { QueryResponseProvider } from '../../modules/companies/core/QueryResponseProvider';
import { ListViewProvider } from '../../modules/companies/core/ListViewProvider';
import { TopFallersTable } from '../../modules/dashboard/components/TopFallersTable';
import { TopGainersTable } from '../../modules/dashboard/components/TopGainersTable';

const DashboardPage: FC = () => {
  const intl = useIntl();
  return (
    <>
      <FinancialsIndicators />
      <div className='row'>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-0 h-100'>
            <div className='card-header align-items-center'>
              <h5 className='card-title fw-bolder'>
                {intl.formatMessage({ id: 'DASHBOARD.TOP_FALLERS' })}
              </h5>
              <span className='fs-8'>
                at {dateFormatter(new Date(), 'DD/MM/YYYY - hh:mm')} (AEDT)
              </span>
            </div>
            <div className='card-body pb-0'>
              <TopFallersTable />
            </div>
          </div>
        </div>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-0 h-100'>
            <div className='card-header align-items-center'>
              <h5 className='card-title fw-bolder'>
                {intl.formatMessage({ id: 'DASHBOARD.TOP_GAINERS' })}
              </h5>
              <span className='fs-8'>
                at {dateFormatter(new Date(), 'DD/MM/YYYY - hh:mm')} (AEDT)
              </span>
            </div>
            <div className='card-body pb-3'>
              <TopGainersTable />
            </div>
          </div>
        </div>
      </div>
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
                at {dateFormatter(new Date(), 'DD/MM/YYYY - hh:mm')} (AEDT)
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
      <QueryRequestProvider>
        <QueryResponseProvider>
          <ListViewProvider>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</PageTitle>
            <DashboardPage />
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </>
  );
};

export { DashboardWrapper };
