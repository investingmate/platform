/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {EnableSidebar, PageTitle} from '../../../_metronic/layout/core'
import {Questions} from '../../modules/apps/dev/components/partials/Questions'

const DashboardWrapper: FC = () => {
  // const intl = useIntl()
  return (
    <EnableSidebar>
      <PageTitle description='You’ve got 24 New Sales' breadcrumbs={[]}>
        Hello, Paul
      </PageTitle>
      <Questions />
    </EnableSidebar>
  )
}

export {DashboardWrapper}
