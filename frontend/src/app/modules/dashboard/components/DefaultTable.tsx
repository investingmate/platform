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
import { PathsConstants } from '../../../../utils/PathsConstants';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { IMSVG } from '../../../../_investingmate/helpers';

interface IDefaultTable {
  columns: any;
  defaultData: any;
  hidePagination?: boolean;
  isClickable?: boolean;
  status?: string;
}
const DefaultTable = (props: IDefaultTable) => {
  const { columns, defaultData, hidePagination = false, isClickable = false, status } = props;
  const location = useLocation();
  const isDashboardPage = location.pathname.replace('/', '') === PathsConstants.DASHBOARD;
  const nav = useNavigate();
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

  const handleOnClick = (row: any) => {
    console.log(row.original);
    if (isDashboardPage) {
      nav(`/companies/company-overview`, { state: { company: JSON.stringify(row.original) } });
    } else {
      nav(
        `company-overview`,
        // `company-overview?ticker=${row.original.ticker.toLowerCase()}`,
        { state: { company: JSON.stringify(row.original) } }
      );
    }
  };

  const renderIcon = (cell: string, status: string) => {
    if (status === 'UP' && cell === 'percentage') {
      return (
        <IMSVG
          path='/media/icons/duotune/arrows/arr066.svg'
          className='svg-icon-3 svg-icon-success ms-4'
        />
      );
    } else if (status === 'DOWN' && cell === 'percentage') {
      return (
        <IMSVG
          path='/media/icons/duotune/arrows/arr065.svg'
          className='svg-icon-3 svg-icon-danger ms-4'
        />
      );
    }
    return null;
  };

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
                      if (cell.column.id === 'flag') {
                        return (
                          <th key={cell.column.id}>
                            <div className='d-flex justify-content-center'>
                              <IMSVG
                                path={row.original.flag}
                                className='svg-icon-2 svg-icon-primary'
                              />
                            </div>
                          </th>
                        );
                      }

                      if (cell.column.id === 'icon') {
                        return (
                          <th key={cell.column.id}>
                            <div className='d-flex justify-content-center'>
                              <i className={`bi ${row.original.icon} fs-3 fw-bold text-dark`} />
                            </div>
                          </th>
                        );
                      }

                      return isClickable ? (
                        <td key={cell.id} onClick={() => handleOnClick(row)}>
                          {status && cell.column.id === 'percentage' ? (
                            <div className='d-flex justify-content-around'>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              {status && cell.column.id && renderIcon(cell.column.id, status)}
                            </div>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </td>
                      ) : (
                        <td key={cell.id}>
                          {status && cell.column.id === 'percentage' ? (
                            <div className='d-flex justify-content-around'>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              {status && cell.column.id && renderIcon(cell.column.id, status)}
                            </div>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {data.length > 5 && !hidePagination && <ListPagination table={table} />}
    </div>
  );
};
export { DefaultTable };
