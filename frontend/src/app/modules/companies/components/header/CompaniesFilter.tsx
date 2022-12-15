import React from 'react';
import { Column, Table } from '@tanstack/react-table';
import { IMSVG } from '../../../../../_investingmate/helpers';

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const { type, list } = props;
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounce]);

  return (
    <div
      className='d-flex align-items-center position-relative my-1'
      // style={{width: type === 'number' ? '47%' : '100%'}}
    >
      {list !== 'logolist' && list !== 'favlist' && (
        <IMSVG
          path={
            type === 'text'
              ? '/media/icons/duotune/general/gen021.svg'
              : '/media/icons/duotune/general/gen031.svg'
          }
          className='svg-icon-1 position-absolute ms-6'
        />
      )}
      <input
        {...props}
        className='form-control form-control-solid ps-14'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={list === 'logolist' || list === 'favlist'}
        style={{
          backgroundColor: list === 'logolist' || list === 'favlist' ? 'white' : 'auto',
          borderColor: list === 'logolist' || list === 'favlist' ? 'white' : 'auto',
        }}
      />
    </div>
  );
}

export function CompaniesFilter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === 'number' ? (
    <div>
      <div className='d-flex flex-column'>
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
          }`}
        />
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
          }`}
        />
      </div>
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any, index: number) => (
          <option value={value} key={`${value}-${index}`} />
        ))}
      </datalist>
      <DebouncedInput
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search (${column.getFacetedUniqueValues().size})`}
        list={column.id + 'list'}
      />
      <div className='h-1' />
    </>
  );
}
