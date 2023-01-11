import React from 'react';
import { FinancialsGroup } from '../../core/_models';
import { FinancialsTable } from '../table/FinancialsTable';

interface Props {
  data: FinancialsGroup[];
}
const BalanceSheet = (props: Props) => {
  const { data } = props;
  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <>
              <FinancialsTable key={item.name} group={item.group} title={item.name.toUpperCase()} />
              <div className='separator my-10 mt-12' />
            </>
          );
        })}
    </>
  );
};
export { BalanceSheet };
