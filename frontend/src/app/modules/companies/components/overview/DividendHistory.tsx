import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "../../../../../components/CustomCard";

const DividendHistory = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.DIVIDEND_HISTORY'})}>
      TODO
    </CustomCard>
  )
}

export {DividendHistory}
