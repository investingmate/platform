import React from 'react';
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Indicator, TIndicatorColumn } from '../../core/_models';
import { DraggableColumnHeader } from './columns/DraggableColumnHeader';
import { ListPagination } from '../pagination/ListPagination';

interface Props {
  indicators: Indicator[];
}
const IndicatorsTable = (props: Props) => {
  const { indicators } = props;
  const defaultData = indicators ?? [];

  const labels = !(indicators && indicators.length > 0 && indicators[0].history_data)
    ? []
    : indicators[0].history_data.map((his, index) => {
        return {
          accessorFn: (row: Indicator) => {
            let value = '0.0';

            if (row && row.history_data && row.history_data[index].amount) {
              value = row.history_data[index].amount.toFixed(2);

              if (row.history_data[index].name === 'D.Y') {
                value = value + ' %';
              }
            }

            return value;
          },
          id: his.year,
          header: his.year,
          cell: (info: { getValue: () => any }) => info.getValue(),
          size: 100,
        };
      });

  const name = [
    {
      accessorFn: (row: { name: any }) => row.name,
      id: 'name',
      header: 'Indicator',
      cell: (info: { getValue: () => any }) => info.getValue(),
      size: 100,
    },
  ];
  // @ts-ignore
  const finalLabels = name.concat(labels);
  const columns = React.useMemo<TIndicatorColumn[]>(() => finalLabels, [finalLabels]);

  const [data] = React.useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='border-0 pb-0 pt-2'>
      <div className='table-responsive'>
        <table className='table table-hover align-middle fs-6 dataTable no-footer border table-rounded'>
          <thead className='table-header'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className='text-start fw-bolder fs-7 text-uppercase gs-0' key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DraggableColumnHeader
                    key={header.id}
                    header={header}
                    table={table}
                    isFilterEnabled={false}
                    isDragEnabled={false}
                  />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 10)
              .map((row) => {
                return (
                  <tr key={row.id} className='cursor-pointer btn-light'>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <ListPagination table={table} />
    </div>
  );
};
export { IndicatorsTable };
