import React, {FC} from "react";
import {Table} from "@tanstack/react-table";
import {Company} from "../../core/_models";

const ListPagination: FC<{
  table: Table<Company>
}> = ({ table }) => {
  return (
    <div className="d-flex flex-lg-row justify-content-between w-100">
      <div className="d-flex flex-lg-row justify-content-between">
        <button
          className='btn btn-light-primary me-3'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <i className="fas fa-regular fa-backward m-3"/>
        </button>
        <button
          className='btn btn-light-primary me-3'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <i className="fas fa-regular fa-backward-step m-3"/>
        </button>
        <button
          className='btn btn-light-primary me-3'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <i className="fas fa-regular fa-forward-step m-3"/>
        </button>
        <button
          className='btn btn-light-primary me-3'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <i className="fas fa-regular fa-forward m-3"/>
        </button>
      </div>
      <span>
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </strong>
      </span>
        <span>
        Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
          className='form-control form-control-solid w-100px'
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
        className='form-select form-select-solid fw-bolder w-200px'
      >
        {[5, 10, 15, 20, 25, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}

export {ListPagination}
