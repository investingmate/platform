import React from 'react';
import { TForeignExchangeColumn } from '../../companies/core/_models';
import { DefaultTable } from './DefaultTable';

// TODO refactor this based on the data provider integration

const arrayOfCurrencies = [
  'US Dollar',
  'Euro',
  'British Pound',
  'New Zealand Dollar',
  'Canadian Dollar',
  'Japanese Yen',
  'Singapore Dollar',
  'Hong Kong Dollar',
];

const icons = [
  'bi-currency-dollar',
  'bi-currency-euro',
  'bi-currency-pound',
  'bi-currency-dollar',
  'bi-currency-dollar',
  'bi-currency-yen',
  'bi-currency-dollar',
  'bi-currency-dollar',
];

const defaultData = arrayOfCurrencies.map((item, index) => {
  return {
    id: index,
    icon: icons[index],
    name: item,
    amount: parseFloat((Math.random() + 1).toFixed(2)),
  };
});

const ForeignExchangeTable = () => {
  const columns = React.useMemo<TForeignExchangeColumn[]>(
    () => [
      {
        accessorFn: (row) => row.icon,
        id: 'icon',
        header: '',
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
        accessorFn: (row) => row.amount,
        id: 'amount',
        header: 'Amount',
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return <DefaultTable columns={columns} defaultData={defaultData} />;
};
export { ForeignExchangeTable };
