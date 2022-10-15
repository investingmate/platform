import React, {useEffect, useMemo} from 'react'
import {
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable, FilterFn,
} from '@tanstack/react-table'
import {
  rankItem,
} from '@tanstack/match-sorter-utils'

import {TColumn} from "../../core/_models";
import {useQueryResponseData} from "../../core/QueryResponseProvider";
import {IMSVG} from "../../../../../_investingmate/helpers";
import {DraggableColumnHeader} from "./columns/DraggableColumnHeader";
import {ListPagination} from "../pagination/ListPagination";
import {CompaniesListSearchComponent} from "../header/CompaniesListSearchComponent";
import {CompaniesListGrouping} from "../header/CompaniesListGrouping";
import {useListView} from "../../core/ListViewProvider";
import {CompaniesListFilter} from "../header/CompaniesListFilter";
import {CompaniesListDropDown} from "../header/CompaniesListDropdown";
import {defaultColumns} from "./columns/_columns";

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

const CompaniesTable = () => {
  const {selected} = useListView()
  const companies = useQueryResponseData()
  console.log({companies})

  const data = useMemo(() => companies, [companies])
  console.log({data})

  const [columns, setColumns] = React.useState(() => [...defaultColumns])
  const [columnsSelected, setColumnsSelected] = React.useState(() => [...defaultColumns].map((col) => {return {...col, status: true}}))
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnOrder,
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  // display the columns selected only
  useEffect(() => {
    const updatedCols: TColumn[] = []
    columnsSelected.forEach(col => {
      if(col.status){
        updatedCols.push(col)
      }
    })
    setColumns(updatedCols)
  }, [columnsSelected])

  return (
    <div className="card-header border-0 pb-6">
      <CompaniesListSearchComponent
        value={globalFilter ?? ''}
        onChange={value => setGlobalFilter(String(value))}
      />
      <div className='card-toolbar'>
        {selected.length > 0 ?
          <CompaniesListGrouping /> :
          <div className='d-flex justify-content-end' data-im-user-table-toolbar='base'>
            <CompaniesListFilter />
            <CompaniesListDropDown columns={columnsSelected} setColumns={setColumnsSelected}/>
          </div>
        }
      </div>
      <div className='table-responsive'>
        <table
          id='im_table_companies'
          className='table table-striped align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
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
      <ListPagination table={table}/>
    </div>
  )
}
export {CompaniesTable}
