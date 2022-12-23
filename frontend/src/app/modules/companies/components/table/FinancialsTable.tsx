import React from 'react';
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnOrderState,
  ColumnFiltersState,
} from '@tanstack/react-table';

import { FinancialsData, TFinancialColumn } from '../../core/_models';
import { DraggableColumnHeader } from './columns/DraggableColumnHeader';
import { ListPagination } from '../pagination/ListPagination';
import { fuzzyFilter } from '../../../../../utils/HelperFunctions';

interface Props {
  group: FinancialsData[];
  title: string;
}
const FinancialsTable = (props: Props) => {
  const { group, title } = props;
  const defaultData = group ?? [];

  const labels = !(group && group.length > 0 && group[0].history_data)
    ? []
    : group[0].history_data.map((his, index) => {
        return {
          accessorFn: (row: FinancialsData) => {
            let value = 0;

            if (row && row.history_data && row.history_data[index].amount) {
              value = row.history_data[index].amount;
            }

            return value;
          },
          id: his.year,
          header: his.year,
          cell: (info: { getValue: () => any }) => info.getValue(),
          size: 150,
        };
      });

  const name = [
    {
      accessorFn: (row: { name: any }) => row.name,
      id: 'name',
      header: title,
      cell: (info: { getValue: () => any }) => info.getValue(),
      size: 250,
    },
  ];
  // @ts-ignore
  const finalLabels = name.concat(labels);
  const columns = React.useMemo<TFinancialColumn[]>(() => finalLabels, [finalLabels]);

  const [data] = React.useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [columns, setColumns] = React.useState(() => [...finalLabels]);

  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
      globalFilter,
      columnFilters,
      sorting,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
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
                    isFilterEnabled
                    isDragEnabled
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
export { FinancialsTable };
