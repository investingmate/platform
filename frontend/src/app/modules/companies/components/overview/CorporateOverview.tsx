import React from 'react'
import {useIntl} from 'react-intl';
import {CustomCard} from "../../../../../components/CustomCard";

const CorporateOverview = () => {
  const intl = useIntl()
  return (
    <CustomCard title={intl.formatMessage({id: 'COMPANIES.CORPORATE_OVERVIEW'})}>
      TODO
    </CustomCard>
  )
}

export {CorporateOverview}
