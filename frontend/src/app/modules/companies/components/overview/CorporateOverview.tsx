import React from 'react'
import {CorporateOverview} from "../../core/_models";
import {useIntl} from "react-intl";

interface Props {
  overview: CorporateOverview
}

const CorporateOverviewComponent = (props: Props) => {
  const { overview } = props;
  const intl = useIntl()

  console.log('overview',overview)
  return (
    <div className='card-body ps-3 pt-2 pb-2'>
      <h5>
        {intl.formatMessage({id: 'COMPANIES.OVERVIEW'})}
      </h5>
      <p>
        {overview.description}
      </p>
      <h5 className="mt-6">
        {intl.formatMessage({id: 'COMPANIES.DETAILS'})}
      </h5>
      <div className="mt-6">
        {overview.details.map(detail => {
          return (
            <div className="d-flex">
              <h6 className="min-w-100px">{detail.label}:</h6>
              <p>{detail.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export {CorporateOverviewComponent}
