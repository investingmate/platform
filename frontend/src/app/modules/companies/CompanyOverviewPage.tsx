import {IMCard, useQuery} from "../../../_investingmate/helpers";
import {useLocation} from 'react-router-dom'
import {CompaniesHeader} from "./components/header/CompaniesHeader";
import {Company} from "./core/_models";

const CompanyOverviewPage = () => {
  const query = useQuery();
  const location = useLocation();
  let company: Company | undefined = undefined;
  let state: any;

  // getting the company details from state
  if(location && location.state){
    state = location.state
    if(state && state.company)
      company = state.company && JSON.parse(state.company);
  }
  // TODO this page, TICKER: {query.get("ticker")}
  console.log({company})
  return (
    <>
      <IMCard>
        {company && <CompaniesHeader company={company}/> }
      </IMCard>
    </>
  )
}

export default CompanyOverviewPage
