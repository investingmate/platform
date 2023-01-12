import React from 'react';
import { TForeignIndexColumn } from '../../companies/core/_models';
import { DefaultTable } from './DefaultTable';

// TODO refactor this based on the data provider integration

const arrayOfCurrencies = [
  'S&P 500',
  'DAX',
  'CAC 40',
  'FTSE 100',
  'EURO Stoxx 50',
  'FTSE MIB',
  'SMI',
  'IBOV',
];

const flags = [
  '/media/flags/united-states.svg',
  '/media/flags/germany.svg',
  '/media/flags/france.svg',
  '/media/flags/united-kingdom.svg',
  '/media/flags/european-union.svg',
  '/media/flags/italy.svg',
  '/media/flags/switzerland.svg',
  '/media/flags/brazil.svg',
];

const defaultData = arrayOfCurrencies.map((item, index) => {
  return {
    id: index,
    flag: flags[index],
    index: item,
    last: parseFloat((Math.random() + 1500).toFixed(2)),
    high: parseFloat((Math.random() + 1500).toFixed(2)),
    low: parseFloat((Math.random() + 1500).toFixed(2)),
  };
});

const ForeignIndicesTable = () => {
  const columns = React.useMemo<TForeignIndexColumn[]>(
    () => [
      {
        accessorFn: (row) => row.flag,
        id: 'flag',
        header: '',
        cell: (info) => info.getValue(),
        size: 20,
      },
      {
        accessorFn: (row) => row.index,
        id: 'index',
        header: 'Index',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.last,
        id: 'last',
        header: 'Last',
        cell: (info) => info.getValue(),
        size: 50,
      },
      {
        accessorFn: (row) => row.high,
        id: 'high',
        header: 'High',
        cell: (info) => info.getValue(),
        size: 50,
      },
      {
        accessorFn: (row) => row.low,
        id: 'low',
        header: 'Low',
        cell: (info) => info.getValue(),
        size: 50,
      },
    ],
    []
  );

  return <DefaultTable columns={columns} defaultData={defaultData} />;
};
export { ForeignIndicesTable };
