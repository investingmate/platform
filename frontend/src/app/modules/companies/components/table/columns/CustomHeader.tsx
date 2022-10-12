import clsx from 'clsx'
import React, {FC, PropsWithChildren, useMemo} from 'react'
import {HeaderProps} from 'react-table'
import {initialQueryState} from '../../../../../../_investingmate/helpers'
import {useQueryRequest} from '../../../core/QueryRequestProvider'
import {Company} from "../../../core/_models";

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<Company>>
}
const CustomHeader: FC<Props> = ({className, title, tableProps}) => {
  // console.log({tableProps})
  const id = tableProps.column.id
  const {state, updateState} = useQueryRequest()

  const isSelectedForSorting = useMemo(() => {
    return state.sort && state.sort === id
  }, [state, id])
  const order: 'asc' | 'desc' | undefined = useMemo(() => state.order, [state])

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === 'actions' || id === 'selection') {
      return
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateState({sort: id, order: 'asc', ...initialQueryState})
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === 'asc') {
        // enable sort desc
        updateState({sort: id, order: 'desc', ...initialQueryState})
        return
      }

      // disable sort
      updateState({sort: undefined, order: undefined, ...initialQueryState})
    }
  }

  return (
    <div className="d-flex justify-content-around align-items-center">
      <i className="fas fa-regular fa-arrows-left-right m-3"></i>
      <th
        {...tableProps.column.getHeaderProps()}
        className={clsx(
          className,
          isSelectedForSorting && order !== undefined && `table-sort-${order}`
        )}
        style={{cursor: 'pointer'}}
        onClick={sortColumn}
      >
        {title}
      </th>
    </div>
  )
}

export {CustomHeader}
