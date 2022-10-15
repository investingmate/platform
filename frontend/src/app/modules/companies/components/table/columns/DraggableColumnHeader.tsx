import React, {FC} from 'react'
import {Column, ColumnOrderState, flexRender, Header, Table} from "@tanstack/react-table";
import {useDrag, useDrop} from "react-dnd";
import {Company} from "../../../core/_models";

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
  table: Table<any>
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
      <div
        ref={previewRef}
        {...{
          className: header.column.getCanSort()
            ? 'cursor-pointer select-none'
            : '',
          onClick: header.column.getToggleSortingHandler(),
        }}
      >
        <span
          ref={dragRef}
          className='me-3'
        >
          <i className="fas fa-regular fa-arrows-left-right m-3"/>
          {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: <i className="fas fa-regular fa-arrow-up-short-wide m-3"/>,
            desc: <i className="fas fa-regular fa-arrow-down-short-wide m-3"/>,
          }[header.column.getIsSorted() as string] ?? null}
        </span>
      </div>
    </th>
  )
}

export {DraggableColumnHeader}
