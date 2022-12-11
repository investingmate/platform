import {IMCard} from "../../../_investingmate/helpers";
import {CompaniesHeader} from "./components/header/CompaniesHeader";
import {FinancialsSummary} from "./components/financials/FinancialsSummary";
import {IncomeStatement} from "./components/financials/IncomeStatement";
import {CashFlow} from "./components/financials/CashFlow";
import {BalanceSheet} from "./components/financials/BalanceSheet";

const CompanyFinancialsPage = () => {

  return (
    <IMCard>
      <CompaniesHeader />
      <FinancialsSummary />
      <IncomeStatement />
      <BalanceSheet />
      <CashFlow />
    </IMCard>
  )
}

export default CompanyFinancialsPage
