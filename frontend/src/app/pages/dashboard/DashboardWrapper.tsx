/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_investingmate/layout/core/PageData';
import { CompaniesListWrapper } from '../../modules/companies/components/CompaniesList';
import { DataDisclaimer } from '../../../components/DataDisclaimer';
import { CustomCard } from '../../../components/CustomCard';
import { NewsSection } from '../../modules/dashboard/components/NewsSection';
import { FinancialsIndicators } from '../../modules/dashboard/components/FinancialsIndicators';
import { dateFormatter, numberFormatter } from '../../../utils/HelperFunctions';
import { ForeignExchangeTable } from '../../modules/dashboard/components/ForeignExchangeTable';
import { QueryRequestProvider } from '../../modules/companies/core/QueryRequestProvider';
import {
  QueryResponseProvider,
  useQueryResponseData,
} from '../../modules/companies/core/QueryResponseProvider';
import { ListViewProvider } from '../../modules/companies/core/ListViewProvider';
import { TopListTable } from '../../modules/dashboard/components/TopListTable';
import { TListColumn } from '../../modules/companies/core/_models';
import { IMSVG } from '../../../_investingmate/helpers';
import { ForeignIndicesTable } from '../../modules/dashboard/components/ForeignIndicesTable';

const DashboardPage: FC = () => {
  const intl = useIntl();
  const companies = useQueryResponseData();
  // TODO refactor this based on the data provider integration
  const defaultData = companies
    .map((item, index) => {
      const amount = numberFormatter(Math.random() + 1);
      return {
        ...item,
        amount_change: amount,
        percentage: numberFormatter(amount * 0.33), // mock dummy data
      };
    })
    .sort((p1, p2) =>
      p1.amount_change < p2.amount_change ? 1 : p1.amount_change > p2.amount_change ? -1 : 0
    );

  // TODO refactor this based on the data provider integration
  const defaultData2 = companies
    .map((item, index) => {
      const amount = numberFormatter(Math.random() + 1);
      return {
        ...item,
        amount_change: amount,
        percentage: -numberFormatter(amount * 0.33), // mock dummy data
      };
    })
    .sort((p1, p2) =>
      p1.amount_change < p2.amount_change ? 1 : p1.amount_change > p2.amount_change ? -1 : 0
    );

  const columns = React.useMemo<TListColumn[]>(
    () => [
      {
        accessorFn: (row) => row.ticker,
        id: 'ticker',
        header: 'Ticker',
        cell: (info) => info.getValue(),
        size: 50,
      },
      {
        accessorFn: (row) => row.name,
        id: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.amount_change,
        id: 'amount_change',
        header: 'Amount',
        cell: (info) => `$${info.getValue()}`,
        size: 50,
      },
      {
        accessorFn: (row) => row.percentage,
        id: 'percentage',
        header: 'Percentage',
        cell: (info) => `${info.getValue()}%`,
        size: 50,
      },
    ],
    []
  );

  return (
    <>
      <FinancialsIndicators />
      <div className='row'>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-0 h-100'>
            <div className='card-header align-items-center'>
              <h5 className='card-title fw-bolder'>
                <IMSVG
                  path='/media/icons/duotune/arrows/arr065.svg'
                  className='svg-icon-1 svg-icon-danger me-4'
                />
                {intl.formatMessage({ id: 'DASHBOARD.TOP_FALLERS' })}
              </h5>
              <span className='fs-8'>
                at {dateFormatter(new Date(), 'DD/MM/YYYY - hh:mm')} (AEDT)
              </span>
            </div>
            <div className='card-body pb-0'>
              <TopListTable columns={columns} defaultData={defaultData2} status='DOWN' />
            </div>
          </div>
        </div>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-0 h-100'>
            <div className='card-header align-items-center'>
              <h5 className='card-title fw-bolder'>
                <IMSVG
                  path='/media/icons/duotune/arrows/arr066.svg'
                  className='svg-icon-1 svg-icon-success me-4'
                />
                {intl.formatMessage({ id: 'DASHBOARD.TOP_GAINERS' })}
              </h5>
              <span className='fs-8'>
                at {dateFormatter(new Date(), 'DD/MM/YYYY - hh:mm')} (AEDT)
              </span>
            </div>
            <div className='card-body pb-3'>
              <TopListTable columns={columns} defaultData={defaultData} status='UP' />
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
            <div className='card-header align-items-center'>
              <h5 className='card-title fw-bolder'>
                {intl.formatMessage({ id: 'COMPANIES.FOREIGN_INDICES' })}
              </h5>
              <span className='fs-8'>
                at {dateFormatter(new Date(), 'DD/MM/YYYY - hh:mm')} (AEDT)
              </span>
            </div>
            <div className='card-body pb-0'>
              <ForeignIndicesTable />
            </div>
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
      <div className='row'>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-6 h-100'>
            <NewsSection title={intl.formatMessage({ id: 'DASHBOARD.NEWS' })} />
          </div>
        </div>
        <div className='col-xl-6 pb-6'>
          <div className='card card-custom card-stretch mb-5 mt-6 h-100'>
            <NewsSection title={intl.formatMessage({ id: 'DASHBOARD.NEWS_GLOBAL' })} />
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
