import {Response,ID} from '../../../../_investingmate/helpers'
import {ColumnDef} from "@tanstack/react-table";

export type TCompanyColumn = ColumnDef<Company>
  & {
  status?: boolean,
  description?: string,
}
export type Company = {
  id: ID;
  fav: boolean,
  logo: string,
  name: string,
  ticker: string,
  sector: string,
  exchange: string,
  website: string,
  headline: {
    current: number,
    variation: number,
    min_12_months: number,
    max_12_months: number,
    year_return: number,
    current_month_return: number,
    dividend_yield: number,
    volume: number,
    market_cap: number,
    beta: number,
    shares_issued: number,
  },
  dividends_history: Dividend[]
}

export type CompaniesQueryResponse = Response<Array<Company>>

export const initialCompany: Company = {
  id: 0,
  fav: false,
  logo: "",
  name: "",
  ticker: "",
  sector: "",
  exchange: "",
  website: "",
  headline: {
    current: 0.0,
    variation: 0.0,
    min_12_months: 0.0,
    max_12_months: 0.0,
    year_return: 0.0,
    current_month_return: 0.0,
    dividend_yield: 0.0,
    volume: 0.0,
    market_cap: 0.0,
    beta: 0.0,
    shares_issued: 0,
  },
  dividends_history: [{
    date: '',
    amount: '',
    franking: '',
    gross: '',
    type: '',
    payable: '',
  }]
};

export interface IHeadline {
  label: string
  value: number
}

export type TDividendsColumn = ColumnDef<Dividend>

export type Dividend = {
  id?: ID;
  date: string,
  amount: string,
  franking: string,
  gross: string,
  type: string,
  payable: string,
}
