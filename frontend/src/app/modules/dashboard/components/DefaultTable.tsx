import React from 'react';
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DraggableColumnHeader } from '../../companies/components/table/columns/DraggableColumnHeader';
import { ListPagination } from '../../companies/components/pagination/ListPagination';

interface IDefaultTable {
  columns: any;
  defaultData: any;
}
const DefaultTable = (props: IDefaultTable) => {
  const { columns, defaultData } = props;

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
                      if (cell.column.id === 'icon') {
                        return (
                          <th key={cell.column.id}>
                            <div className='d-flex justify-content-center'>
                              <i className={`bi ${row.original.icon} fs-3 fw-bold text-dark`} />
                            </div>
                          </th>
                        );
                      }
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
      {data.length > 5 && <ListPagination table={table} />}
    </div>
  );
};
export { DefaultTable };
