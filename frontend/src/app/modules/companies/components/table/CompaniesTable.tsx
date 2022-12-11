import React, {useEffect, useMemo} from 'react'
import {
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  FilterFn,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/react-table'
import {rankItem} from '@tanstack/match-sorter-utils'

import {Company, TCompanyColumn} from '../../core/_models'
import {useQueryResponseData} from '../../core/QueryResponseProvider'
import {IMSVG} from '../../../../../_investingmate/helpers'
import {DraggableColumnHeader} from './columns/DraggableColumnHeader'
import {ListPagination} from '../pagination/ListPagination'
import {CompaniesListSearch} from '../header/CompaniesListSearch'
import {CompaniesListGrouping} from '../header/CompaniesListGrouping'
import {useListView} from '../../core/ListViewProvider'
import {CompaniesListDropDown} from '../header/CompaniesListDropdown'
import {useNavigate} from 'react-router-dom'
import {addToWatchlist, removeFromWatchlist} from '../../../../../utils/HelperFunctions'

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
  const nav = useNavigate()
  const data = useMemo(() => companies, [companies])

  const [isFilterEnabled, setIsFilterEnabled] = React.useState(true)
  const MIN_SIZE = isFilterEnabled ? 160 : 100
  const defaultColumns: TCompanyColumn[] = [
    {
      accessorKey: 'fav',
      id: 'fav',
      header: '',
      cell: (info) => info.getValue(),
      size: 50,
    },
    {
      accessorKey: 'logo',
      id: 'logo',
      header: '',
      cell: (info) => info.getValue(),
      size: 50,
    },
    {
      accessorFn: (row) => row.ticker,
      id: 'ticker',
      header: 'Ticker',
      cell: (info) => info.getValue(),
      size: 200,
    },
    {
      accessorFn: (row) => row.name,
      id: 'name',
      header: 'Name',
      cell: (info) => info.getValue(),
      size: 250,
    },
    {
      accessorFn: (row) => row.sector,
      id: 'sector',
      header: 'Sector',
      cell: (info) => info.getValue(),
      size: 200,
    },
    {
      accessorFn: (row) => row.exchange,
      id: 'exchange',
      header: 'Exchange',
      cell: (info) => info.getValue(),
      size: 200,
    },
    {
      accessorFn: (row) => row.website,
      id: 'website',
      header: 'Website',
      cell: (info) => info.getValue(),
      size: 200,
    },
    {
      accessorFn: (row) => row.headline.current,
      id: 'current',
      header: 'Current',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.variation,
      id: 'variation',
      header: 'Variation',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.min_12_months,
      id: 'min_12_months',
      header: 'Min 12 months',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.max_12_months,
      id: 'max_12_months',
      header: 'Max 12 months',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.year_return,
      id: 'year_return',
      header: 'Year return',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.current_month_return,
      id: 'current_month_return',
      header: 'Month return',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.dividend_yield,
      id: 'dividend_yield',
      header: 'Dividend yield',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.volume,
      id: 'volume',
      header: 'Volume',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.market_cap,
      id: 'market_cap',
      header: 'Market cap',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.beta,
      id: 'beta',
      header: 'Beta',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
    {
      accessorFn: (row) => row.headline.shares_issued,
      id: 'shares_issued',
      header: 'Shares issued',
      cell: (info) => info.getValue(),
      size: MIN_SIZE,
    },
  ]
  const [columns, setColumns] = React.useState(() => [...defaultColumns])
  const [columnsSelected, setColumnsSelected] = React.useState(() =>
    [...defaultColumns].map((col) => {
      return {...col, status: true}
    })
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  useEffect(() => {
    setColumns(defaultColumns)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterEnabled])

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnOrder,
      globalFilter,
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  // display the columns selected only
  useEffect(() => {
    const updatedCols: TCompanyColumn[] = []
    columnsSelected.forEach((col) => {
      if (col.status) {
        updatedCols.push(col)
      }
    })
    setColumns(updatedCols)
  }, [columnsSelected])

  const handleOnClick = (row: any) => {
    nav(
      `company-overview`,
      // `company-overview?ticker=${row.original.ticker.toLowerCase()}`,
      {state: {company: JSON.stringify(row.original)}}
    )
  }

  const handleFav = (row: any) => {
    const isFav = checkWatchlistState(row)
    if (!isFav) {
      addToWatchlist(row.original)
    } else {
      removeFromWatchlist(row.original)
    }
    setColumns(defaultColumns)
  }

  const checkWatchlistState = (row: any) => {
    const newList = localStorage.getItem('watchList')
    if (newList) {
      const filtered = JSON.parse(newList).filter(
        (i: Company) => i && i.ticker === row.original.ticker
      )
      return filtered.length > 0
    }
    return false
  }

  return (
    <div className='card-header border-0 pb-6 pt-6'>
      <CompaniesListSearch
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
      />
      <div className='card-toolbar'>
        {selected.length > 0 ? (
          <CompaniesListGrouping />
        ) : (
          <div className='d-flex justify-content-end' data-im-user-table-toolbar='base'>
            {/*<CompaniesListFilter />*/}
            <CompaniesListDropDown
              columns={columnsSelected}
              setColumns={setColumnsSelected}
              isFilterEnabled={isFilterEnabled}
              setIsFilterEnabled={setIsFilterEnabled}
            />
          </div>
        )}
      </div>
      <div className='table-responsive'>
        <table
          id='im_table_companies'
          className='table table-hover align-middle fs-6 dataTable no-footer border table-rounded'
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className='text-start fw-bolder fs-7 text-uppercase gs-0' key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <DraggableColumnHeader
                    key={header.id}
                    header={header}
                    table={table}
                    isFilterEnabled={isFilterEnabled}
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
                      if (cell.column.id === 'logo') {
                        return (
                          <th key={cell.column.id}>
                            {row.original.logo.length > 0 ? (
                              <div className='symbol-label'>
                                <img
                                  src={row.original.logo}
                                  alt={row.original.name}
                                  className='w-100'
                                />
                              </div>
                            ) : (
                              <IMSVG
                                path='/media/icons/duotune/general/gen006.svg'
                                className='svg-icon svg-icon-3x svg-icon-warning'
                              />
                            )}
                          </th>
                        )
                      } else if (cell.column.id === 'fav') {
                        return (
                          <th key={cell.column.id} onClick={() => handleFav(row)}>
                            <>
                              {checkWatchlistState(row) ? (
                                <span className='indicator-label'>
                                  <i className='fas fa-regular fa-star mx-2 fs-2 text-info' />
                                </span>
                              ) : (
                                <span className='indicator-label text-info'>
                                  <i className='fas fa-regular fa-star mx-2 fs-2' />
                                </span>
                              )}
                            </>
                          </th>
                        )
                      }
                      return (
                        <td key={cell.id} onClick={() => handleOnClick(row)}>
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
      <ListPagination table={table} />
    </div>
  )
}
export {CompaniesTable}
