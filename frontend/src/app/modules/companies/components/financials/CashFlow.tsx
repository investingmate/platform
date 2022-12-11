import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "../../../../../components/CustomCard";

const CashFlow = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.CASH_FLOW'})}>
      TODO
    </CustomCard>
  )
}

export {CashFlow}
