import React from 'react';
import { DefaultTable } from './DefaultTable';

interface ITopListTable {
  columns: any;
  defaultData: any;
}
const TopListTable = (props: ITopListTable) => {
  const { columns, defaultData } = props;

  return defaultData && defaultData.length > 0 ? (
    <DefaultTable columns={columns} defaultData={defaultData} hidePagination isClickable />
  ) : null;
};
export { TopListTable };
