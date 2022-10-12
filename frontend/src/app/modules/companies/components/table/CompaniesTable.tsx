import React, {FC, useMemo} from 'react'
import {
  Column,
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  Header,
  Table,
  useReactTable,
} from '@tanstack/react-table'

import { useDrag, useDrop } from 'react-dnd'
import {Company} from "../../core/_models";
import {useQueryResponseData} from "../../core/QueryResponseProvider";
import {IMSVG} from "../../../../../_investingmate/helpers";

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

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  )
  return [...columnOrder]
}

const DraggableColumnHeader: FC<{
  header: Header<Company, unknown>
  table: Table<Company>
}> = ({ header, table }) => {
  const { getState, setColumnOrder } = table
  const { columnOrder } = getState()
  const { column } = header

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<Company>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      )
      setColumnOrder(newColumnOrder)
    },
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  })

  return (
    <th
      ref={dropRef}
      colSpan={header.colSpan}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer'}}
    >
      <div ref={previewRef}>
        <span
          ref={dragRef}
          className='symbol symbol-circle symbol-50px overflow-hidden me-3'
        >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
          <i className="fas fa-regular fa-arrows-left-right m-3"></i>
        </span>
      </div>
    </th>
  )
}

const CompaniesTable = () => {
  const companies = useQueryResponseData()
  console.log({companies})
  const data = useMemo(() => companies, [companies])
  console.log({data})
  const [columns] = React.useState(() => [...defaultColumns])

  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  return (
    <table
      id='im_table_companies'
      className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
    >
      <thead>
      {table.getHeaderGroups().map(headerGroup => (
        <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0' key={headerGroup.id}>
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
      {table.getRowModel().rows.map(row => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => {
              if(cell.column.id === 'logo'){
                return (
                  <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                    <a href='#'>
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
                    </a>
                  </div>
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
  )
}
export {CompaniesTable}
