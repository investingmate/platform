import {IMCard} from "../../../_investingmate/helpers";
import {CompaniesHeader} from "./components/header/CompaniesHeader";
import {useLocation} from "react-router-dom";
import {getCurrentCompany} from "./core/GetCurrentCompany";
import {PriceGraph} from "./components/overview/PriceGraph";
import {CorporateOverview} from "./components/overview/CorporateOverview";
import {DividendHistory} from "./components/overview/DividendHistory";

const CompanyOverviewPage = () => {
  const location = useLocation();
  const company = getCurrentCompany(location);
  console.log('comp', company)
  return (
    <IMCard className="pb-5 table-responsive">
      <CompaniesHeader />
      <PriceGraph />
      <CorporateOverview />
      <DividendHistory />
    </IMCard>
  )
}

export default CompanyOverviewPage
