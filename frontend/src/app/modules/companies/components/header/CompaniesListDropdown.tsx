import React, { useEffect } from 'react';
import { MenuComponent } from '../../../../../_investingmate/assets/ts/components';
import { IMSVG } from '../../../../../_investingmate/helpers';
import { TCompanyColumn } from '../../core/_models';

interface ICompaniesListDropdown {
  columns: TCompanyColumn[];
  setColumns: (columns: any) => void;
  isFilterEnabled: boolean;
  setIsFilterEnabled: (state: boolean) => void;
}
const CompaniesListDropDown = (props: ICompaniesListDropdown) => {
  const { columns, setColumns, isFilterEnabled, setIsFilterEnabled } = props;

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  // update the status of the column
  const handleChange = (col: TCompanyColumn) => {
    const updatedCols = columns.map((c) => {
      if (col.id === c.id) {
        c.status = !c.status;
      }
      return c;
    });
    setColumns(updatedCols);
  };

  return (
    <div>
      <button
        type='button'
        className='btn btn-light-primary'
        data-im-menu-trigger='click'
        data-im-menu-placement='bottom-end'
        data-im-menu-flip='top-end'
      >
        <IMSVG
          path='/media/icons/duotune/general/gen052.svg'
          className='svg-icon-3 svg-icon-primary'
        />
      </button>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-350px'
        data-im-menu='true'
      >
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Filters</div>
        </div>
        <div className='separator border-gray-200' />
        <div className='px-7 py-5'>
          <label className='m-3 form-check form-check-sm form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              value={isFilterEnabled ? 'enabled' : 'disabled'}
              checked={isFilterEnabled}
              onChange={() => setIsFilterEnabled(!isFilterEnabled)}
            />
            <span className='form-check-label'>Display Filters</span>
          </label>
        </div>
        <div className='separator border-gray-200' />

        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Columns selection</div>
        </div>
        <div className='separator border-gray-200' />

        <div className='px-7 py-5' data-im-user-table-filter='form'>
          <div className='d-flex mb-10'>
            <div className='d-flex flex-column'>
              {columns.slice(0, columns.length / 2 + 1).map((col) => {
                if (col && col.header && col.header.length > 0) {
                  return (
                    <label
                      key={col.id}
                      className='m-3 form-check form-check-sm form-check-custom form-check-solid'
                    >
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value={col.id}
                        checked={col.status}
                        onChange={() => handleChange(col)}
                      />
                      <span className='form-check-label'>{`${col.header}`}</span>
                    </label>
                  );
                }
                return null;
              })}
            </div>
            <div className='d-flex flex-column'>
              {columns.slice(columns.length / 2 + 1, columns.length).map((col) => {
                if (col && col.header && col.header.length > 0) {
                  return (
                    <label
                      key={col.id}
                      className='m-3 form-check form-check-sm form-check-custom form-check-solid'
                    >
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value={col.id}
                        checked={col.status}
                        onChange={() => handleChange(col)}
                      />
                      <span className='form-check-label'>{`${col.header}`}</span>
                    </label>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CompaniesListDropDown };
