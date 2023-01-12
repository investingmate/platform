import React from 'react';
import { DefaultTable } from './DefaultTable';

interface ITopListTable {
  columns: any;
  defaultData: any;
  status: string;
}
const TopListTable = (props: ITopListTable) => {
  const { columns, defaultData, status } = props;

  return defaultData && defaultData.length > 0 ? (
    <DefaultTable
      columns={columns}
      defaultData={defaultData}
      hidePagination
      isClickable
      status={status}
    />
  ) : null;
};
export { TopListTable };
