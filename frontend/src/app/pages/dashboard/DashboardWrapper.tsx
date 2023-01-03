/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_investingmate/layout/core/PageData';
import { CompaniesListWrapper } from '../../modules/companies/components/CompaniesList';
import { DataDisclaimer } from '../../../components/DataDisclaimer';
import { CustomCard } from '../../../components/CustomCard';
import { NewsSection } from '../../modules/dashboard/components/NewsSection';

const DashboardPage: FC = () => {
  const intl = useIntl();
  return (
    <>
      <CustomCard title={intl.formatMessage({ id: 'COMPANIES.WATCH_LIST' })}>
        <CompaniesListWrapper />
      </CustomCard>
      <NewsSection />
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
