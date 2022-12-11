import React, {FC} from 'react'
import {Column, ColumnOrderState, flexRender, Header, Table} from "@tanstack/react-table";
import {useDrag, useDrop} from "react-dnd";
import {Company} from "../../../core/_models";
import {defaultColumnsDescription} from "./_columns";
import {CompaniesFilter} from "../../header/CompaniesFilter";
import {CustomTooltip} from "../../../../../../components/CustomTooltip";

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
  header: Header<any, unknown>
  table: Table<any>,
  isFilterEnabled: boolean
  isDragEnabled?: boolean
}> = (props) => {
  const { header, table, isFilterEnabled, isDragEnabled = true } = props
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

  // get the description about the header
  const colInfo = defaultColumnsDescription.find(col => col.id === header.column.columnDef.id)
  return (
    <th
      ref={dropRef}
      colSpan={header.colSpan}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer', minWidth: `${header.getSize()}px` }}
      className={`min-w-${header.getSize()}px`}
    >
      <div className="d-flex flex-column justify-content-center h-100">
        <CustomTooltip
          description={colInfo && colInfo.description ? colInfo.description : ''}
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
              ref={isDragEnabled ? dragRef : null}
              className='me-3 d-flex align-items-center im-primary'
            >
              {isDragEnabled && <i className="fas fa-regular fa-arrows-left-right m-3 im-primary"/>}
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
              {{
                asc: <i className="fas fa-regular fa-arrow-up-short-wide m-3 im-primary"/>,
                desc: <i className="fas fa-regular fa-arrow-down-short-wide m-3 im-primary"/>,
              }[header.column.getIsSorted() as string] ?? null}
            </span>
          </div>
        </CustomTooltip>
        {isFilterEnabled && header.column.getCanFilter() ? (
            <div>
              <CompaniesFilter column={header.column} table={table} />
            </div>
          ) :
          null
        }
      </div>
    </th>
  )
}

export {DraggableColumnHeader}
