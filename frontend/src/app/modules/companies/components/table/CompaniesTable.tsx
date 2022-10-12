import React, {useMemo} from 'react'
import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel, getSortedRowModel, SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {Company} from "../../core/_models";
import {useQueryResponseData} from "../../core/QueryResponseProvider";
import {IMSVG} from "../../../../../_investingmate/helpers";
import {DraggableColumnHeader} from "./columns/DraggableColumnHeader";

const defaultColumns: ColumnDef<Company>[] = [
  {
    accessorKey: 'logo',
    id: 'logo',
    header: '',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.ticker,
    id: 'ticker',
    header: 'Ticker',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.name,
    id: 'name',
    header: 'Name',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.sector,
    id: 'sector',
    header: 'Sector',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.exchange,
    id: 'exchange',
    header: 'Exchange',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.website,
    id: 'website',
    header: 'Website',
    cell: info => info.getValue(),
  },
]

const CompaniesTable = () => {
  const companies = useQueryResponseData()
  console.log({companies})
  const data = useMemo(() => companies, [companies])
  console.log({data})
  const [columns] = React.useState(() => [...defaultColumns])

  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  return (
    <div className="card-header border-0 pb-6">
      <table
        id='im_table_companies'
        className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
      >
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr
            className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'
            key={headerGroup.id}
          >
            {headerGroup.headers.map(header => (
              <DraggableColumnHeader
                key={header.id}
                header={header}
                table={table}
              />
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.slice(0, 10).map(row => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                if(cell.column.id === 'logo'){
                  return (
                    <th
                      className='symbol symbol-circle symbol-50px overflow-hidden me-3'
                      key={cell.column.id}
                    >
                      {row.original.logo.length > 0 ? (
                        <div className='symbol-label'>
                          <img src={row.original.logo} alt={row.original.name} className='w-100' />
                        </div>
                      ) : (
                        <IMSVG
                          path="/media/icons/duotune/general/gen006.svg"
                          className="svg-icon svg-icon-3x svg-icon-warning"
                        />
                      )}
                    </th>
                  )
                }
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}
export {CompaniesTable}
