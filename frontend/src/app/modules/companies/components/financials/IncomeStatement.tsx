import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "../../../../../components/CustomCard";

const IncomeStatement = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.INCOME_STATEMENT'})}>
      TODO
    </CustomCard>
  )
}

export {IncomeStatement}
