import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "../../../../../components/CustomCard";

const BalanceSheet = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.BALANCE_SHEET'})}>
      TODO
    </CustomCard>
  )
}

export {BalanceSheet}
