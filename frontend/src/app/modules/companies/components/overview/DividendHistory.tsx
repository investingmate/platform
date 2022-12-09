import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "../../../../../components/CustomCard";
import {DividendsTable} from "../table/DividendsTable";

const DividendHistory = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.DIVIDEND_HISTORY'})}>
      <DividendsTable />
    </CustomCard>
  )
}

export {DividendHistory}
