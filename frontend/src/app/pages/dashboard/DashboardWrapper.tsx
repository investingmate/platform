/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_investingmate/layout/core/PageData';
import { CompaniesListWrapper } from '../../modules/companies/components/CompaniesList';
import { DataDisclaimer } from '../../../components/DataDisclaimer';
import { CustomCard } from '../../../components/CustomCard';
import { NewsSection } from '../../modules/dashboard/components/NewsSection';
import { FinancialsIndicators } from '../../modules/dashboard/components/FinancialsIndicators';

const DashboardPage: FC = () => {
  const intl = useIntl();
  return (
    <>
      <FinancialsIndicators />
      <CustomCard title={intl.formatMessage({ id: 'COMPANIES.WATCH_LIST' })}>
        <CompaniesListWrapper />
      </CustomCard>
      <div className='row'>
        <div className='col-xl-6'>
          <NewsSection />
        </div>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-6 h-100'>
            <div className='card-header'>
              <h5 className='card-title fw-bolder'>Widget Title</h5>
            </div>
            <div className='card-body'>Lorem Ipsum is simply dummy text</div>
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
