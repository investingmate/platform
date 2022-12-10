import React, {useEffect, useMemo} from 'react'
import {
  ColumnOrderState,
  SortingState,
  FilterFn,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  getFacetedRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/react-table'
import {
  rankItem,
} from '@tanstack/match-sorter-utils'

import {Dividend, TDividendsColumn} from "../../core/_models";
import {DraggableColumnHeader} from "./columns/DraggableColumnHeader";
import {ListPagination} from "../pagination/ListPagination";
import {useLocation} from "react-router-dom";
import {getCurrentCompany} from "../../core/GetCurrentCompany";
import {dateFormatter} from "../../../../../utils/HelperFunctions";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)
  // Store the itemRank info
  addMeta({
    itemRank,
  })
  // Return if the item should be filtered in/out
  return itemRank.passed
}


// const data:Dividend[] = []
// console.log('company', company)

const DividendsTable = () => {
  const location = useLocation();
  const company = getCurrentCompany(location);
  const defaultData = company.dividends_history ?? []

  const columns = React.useMemo<TDividendsColumn[]>(
    () => [
      {
        accessorFn: row => row.date,
        id: 'date',
        header: 'Date',
        cell: info => dateFormatter(info.getValue()),
      },
      {
        accessorFn: row => row.amount,
        id: 'amount',
        header: 'Amount',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.franking,
        id: 'franking',
        header: 'Franking',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.gross,
        id: 'Gross',
        header: 'Gross',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.type,
        id: 'type',
        header: 'Type',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.payable,
        id: 'payable',
        header: 'Payable',
        cell: info => dateFormatter(info.getValue()),
      },
    ],
    []
  )

  const [data] = React.useState(() => [...defaultData])
  const [sorting, setSorting] = React.useState<SortingState>([])

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
  })

  return (
    <div className="border-0 pb-0 pt-2">
      <div className='table-responsive'>
        <table
          className='table table-hover align-middle fs-6 dataTable no-footer border table-rounded'
        >
          <thead className="table-header">
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              className='text-start fw-bolder fs-7 text-uppercase gs-0'
              key={headerGroup.id}
            >
              {headerGroup.headers.map(header => (
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
          {table.getRowModel().rows.slice(0, 10).map(row => {
            return (
              <tr
                key={row.id}
                className="cursor-pointer btn-light"
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td
                      key={cell.id}
                    >
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
      <ListPagination table={table}/>
    </div>
  )
}
export {DividendsTable}
