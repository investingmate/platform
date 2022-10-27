import {IMCard, useQuery} from "../../../_investingmate/helpers";
import {useLocation} from 'react-router-dom'

const CompanyOverviewPage = () => {
  const query = useQuery();
  const location = useLocation();
  let company: any;
  let state: any;

  // getting the company details from state
  if(location && location.state){
    state = location.state
    if(state && state.company)
      company = state.company && JSON.parse(state.company);
  }
  console.log({company})
  return (
    <>
      <IMCard>
        TODO this page, TICKER: {query.get("ticker")}
      </IMCard>
    </>
  )
}

export default CompanyOverviewPage
