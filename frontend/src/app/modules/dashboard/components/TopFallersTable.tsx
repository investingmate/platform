import React from 'react';
import { TListColumn } from '../../companies/core/_models';
import { DefaultTable } from './DefaultTable';
import { useQueryResponseData } from '../../companies/core/QueryResponseProvider';

const TopFallersTable = () => {
  const companies = useQueryResponseData();
  // TODO refactor this based on the data provider integration
  const defaultData = companies
    .map((item, index) => {
      const amount = parseFloat((Math.random() + 1).toFixed(2));
      return {
        ...item,
        amount_change: amount,
        percentage: (amount * 0.3).toFixed(2), // mock dummy data
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

  return defaultData && defaultData.length > 0 ? (
    <DefaultTable columns={columns} defaultData={defaultData} hidePagination isClickable />
  ) : null;
};
export { TopFallersTable };
