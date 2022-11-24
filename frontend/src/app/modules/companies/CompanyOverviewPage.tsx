import {IMCard} from "../../../_investingmate/helpers";
import {CompaniesHeader} from "./components/header/CompaniesHeader";
// import TradingViewWidget from "react-tradingview-widget";

const CompanyOverviewPage = () => {
  return (
    <>
      <IMCard className="pb-5 table-responsive">
        <CompaniesHeader />
        {/*<TradingViewWidget*/}
        {/*  symbol="NASDAQ:AAPL"*/}
        {/*  timezone="Australia/Sydney"*/}
        {/*  withdateranges*/}
        {/*  details*/}
        {/*  calendar*/}
        {/*  show_popup_button*/}
        {/*  popup_width={window.screen.width * 0.9 ?? "1000"}*/}
        {/*  popup_height={window.screen.height * 0.8 ?? "650"}*/}
        {/*/>*/}
      </IMCard>
    </>
  )
}

export default CompanyOverviewPage
