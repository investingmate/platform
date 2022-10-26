import React, {CSSProperties, PropsWithChildren, useEffect, useMemo, useState} from 'react'
import {useTable, Row, HeaderProps} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../../core/QueryResponseProvider'
// import {companiesColumns} from './columns/_columns'
import {Company} from '../../core/_models'
import {ListLoading} from '../loading/ListLoading'
import {ListPagination} from '../pagination/ListPagination'
import {IMCardBody} from '../../../../../_investingmate/helpers'
// import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import {COLOURS, GRIDS} from "../../../../../utils/DesignContants";
import {CustomHeader} from "./columns/CustomHeader";
// import {InfoCell} from "./columns/InfoCell";
// import {ColumnDef} from "@tanstack/react-table";

const CompaniesTable1 = () => {
  const companies = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => companies, [companies])
  const headerKeys = companies && companies.length > 0 ? Object.keys(companies[0]) : []
  const companiesColumns = headerKeys.map((header)=>{
    return (
      {
        Header: (props: PropsWithChildren<HeaderProps<Company>>) => <CustomHeader tableProps={props} title={header.toUpperCase()} className='min-w-125px' />,
        id: header,
        // Cell: ({...props}) => {
        //   console.log(props)
        //   console.log('props.data[props.row.index]', props.data[props.row.index])
        //   return (<InfoCell company={props.data[props.row.index]} />);
        // },
      }
    )
  })
  const columns = useMemo(() => companiesColumns, [companies])

  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })
  const [itemsState, setItemsState] = useState<any[]>(headers);
  // const [rowsState, setRowsState] = useState<any[]>(data);

  useEffect(() => {
    setItemsState(headers)
  },[headers])

  // const headerKeys = companies && companies.length > 0 ? Object.keys(companies[0]) : []
  // const companiesColumns: ColumnDef<Company>[] = []
  //
  // headerKeys.forEach((header )=>{
  //   console.log('header', {header})
  //   if(header !== 'headline'){
  //     companiesColumns.push(
  //       {
  //         accessorFn: (row: any) => row[header],
  //         id: header,
  //         cell: (info: any) => info.getValue(),
  //         // header: () => <span>Name</span>,
  //       }
  //     )
  //   }
  // })
  // console.log({companiesColumns})
  //
  // const [columns, setColumns] = React.useState<ColumnDef<Company>[]>([])
  //
  // useEffect(() => {
  //   if(columns.length === 0)
  //     setColumns(companiesColumns)
  //
  // },[companiesColumns])
  //
  // const getItemStyle = (
  //   isDragging: boolean,
  //   draggableStyle: CSSProperties
  // ): CSSProperties | undefined => ({
  //   // some basic styles to make the items look a bit nicer
  //   userSelect: 'none',
  //   margin: `0 ${GRIDS.EIGHT}px 0 0`,
  //
  //   // change background colour if dragging
  //   background: isDragging ? 'rgba(245, 248, 250, 0.3)' : '',
  //   color: isDragging ? COLOURS.PURPLE : '',
  //
  //   // styles we need to apply on draggables
  //   ...draggableStyle,
  // });
  //
  // // @ts-ignore
  // const getListStyle = isDraggingOver => ({
  //   // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  //   display: 'flex',
  //   padding: GRIDS.EIGHT,
  //   overflow: 'auto',
  // });
  //
  // // a little function to help us with reordering the result
  // const reorder = (list: any, startIndex: number, endIndex: number) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   return result;
  // };
  //
  // const onDragEnd = (result: DropResult) => {
  //   console.log({result})
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }
  //
  //   const items = reorder(
  //     itemsState,
  //     result.source.index,
  //     result.destination.index
  //   );
  //   setItemsState(items)
  // }

  return (
    <IMCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='im_table_companies'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              <th>
                {/*<DragDropContext onDragEnd={onDragEnd}>*/}
                {/*  <Droppable droppableId="droppable" direction="horizontal">*/}
                {/*    {(provided, snapshot) => (*/}
                {/*      <div*/}
                {/*        ref={provided.innerRef}*/}
                {/*        style={getListStyle(snapshot.isDraggingOver)}*/}
                {/*        {...provided.droppableProps}*/}
                {/*      >*/}
                {/*        {itemsState.map((item, index) => (*/}
                {/*          <Draggable key={item.id} draggableId={item.id} index={index}>*/}
                {/*            {(provided, snapshot) => (*/}
                {/*              <div*/}
                {/*                ref={provided.innerRef}*/}
                {/*                {...provided.draggableProps}*/}
                {/*                {...provided.dragHandleProps}*/}
                {/*                style={getItemStyle(*/}
                {/*                  snapshot.isDragging,*/}
                {/*                  provided.draggableProps.style as CSSProperties*/}
                {/*                )}*/}
                {/*              >*/}
                {/*                <CustomHeaderColumn*/}
                {/*                  // ref={provided.innerRef}*/}
                {/*                  {...provided.draggableProps}*/}
                {/*                  {...provided.dragHandleProps}*/}
                {/*                  style={getItemStyle(*/}
                {/*                  snapshot.isDragging,*/}
                {/*                  provided.draggableProps.style  as CSSProperties*/}
                {/*                  )}*/}
                {/*                  key={item.id}*/}
                {/*                  column={item}*/}
                {/*                />*/}
                {/*              </div>*/}
                {/*            )}*/}
                {/*          </Draggable>*/}
                {/*        ))}*/}
                {/*        {provided.placeholder}*/}
                {/*      </div>*/}
                {/*    )}*/}
                {/*  </Droppable>*/}
                {/*</DragDropContext>*/}
              </th>
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Company>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/*<ListPagination />*/}
      {isLoading && <ListLoading />}
    </IMCardBody>
  )
}

export {CompaniesTable1}
