import {IMCard} from "../../../_investingmate/helpers";
import {useParams} from "react-router-dom";

const CompanyOverviewPage = () => {
  const {ticker} = useParams()
  console.log({ticker})
  return (
    <>
      <IMCard>
        TODO this page, TICKER: {ticker}
      </IMCard>
    </>
  )
}

export default CompanyOverviewPage
