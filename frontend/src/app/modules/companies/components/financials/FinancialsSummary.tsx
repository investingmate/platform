import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "../../../../../components/CustomCard";

const FinancialsSummary = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.FINANCIALS_SUMMARY'})}>
      TODO
    </CustomCard>
  )
}

export {FinancialsSummary}
