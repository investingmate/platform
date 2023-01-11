import React from 'react';
import { TDividendsColumn } from '../../core/_models';
import { useLocation } from 'react-router-dom';
import { getCurrentCompany } from '../../core/GetCurrentCompany';
import { dateFormatter } from '../../../../../utils/HelperFunctions';
import { DefaultTable } from '../../../dashboard/components/DefaultTable';

const DividendsTable = () => {
  const location = useLocation();
  const company = getCurrentCompany(location);
  const defaultData = company.dividends_history ?? [];

  const columns = React.useMemo<TDividendsColumn[]>(
    () => [
      {
        accessorFn: (row) => row.date,
        id: 'date',
        header: 'Date',
        cell: (info) => dateFormatter(info.getValue()),
      },
      {
        accessorFn: (row) => row.amount,
        id: 'amount',
        header: 'Amount',
        cell: (info) => `$${info.getValue()}.00`,
      },
      {
        accessorFn: (row) => row.franking,
        id: 'franking',
        header: 'Franking',
        cell: (info) => `${info.getValue()}%`,
      },
      {
        accessorFn: (row) => row.gross,
        id: 'Gross',
        header: 'Gross',
        cell: (info) => `$${info.getValue()}.00`,
      },
      {
        accessorFn: (row) => row.type,
        id: 'type',
        header: 'Type',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.payable,
        id: 'payable',
        header: 'Payable',
        cell: (info) => dateFormatter(info.getValue()),
      },
    ],
    []
  );

  return <DefaultTable defaultData={defaultData} columns={columns} />;
};
export { DividendsTable };
