import { Response, ID } from '../../../../_investingmate/helpers';
import { ColumnDef } from '@tanstack/react-table';

export type TIndicatorColumn = ColumnDef<Indicator>;

export type IndicatorGroup = {
  id?: ID;
  name: string;
  indicators: Indicator[];
};

export type Indicator = {
  id?: ID;
  year: string;
  amount: number;
  name: string;
  description: string;
  label: string;
  history_data?: Indicator[];
};

export type TCompanyColumn = ColumnDef<Company> & {
  status?: boolean;
  description?: string;
};
export type Company = {
  id: ID;
  fav: boolean;
  logo: string;
  name: string;
  ticker: string;
  sector: string;
  exchange: string;
  website: string;
  headline: {
    current: number;
    variation: number;
    min_12_months: number;
    max_12_months: number;
    year_return: number;
    current_month_return: number;
    dividend_yield: number;
    volume: number;
    market_cap: number;
    beta: number;
    shares_issued: number;
  };
  headlines_history: {
    current: Indicator[];
    variation: Indicator[];
    min_12_months: Indicator[];
    max_12_months: Indicator[];
    year_return: Indicator[];
    current_month_return: Indicator[];
    dividend_yield: Indicator[];
    volume: Indicator[];
    market_cap: Indicator[];
    beta: Indicator[];
    shares_issued: Indicator[];
  };
  dividends_history: Dividend[];
  indicators_group: IndicatorGroup[];
  corporate_overview: CorporateOverview;
  price_data_history: PriceDataHistory;
  financials: Financials;
};

export type CompaniesQueryResponse = Response<Array<Company>>;

export const initialCompany: Company = {
  id: 0,
  fav: false,
  logo: '',
  name: '',
  ticker: '',
  sector: '',
  exchange: '',
  website: '',
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
  headlines_history: {
    current: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    variation: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    min_12_months: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    max_12_months: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    year_return: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    current_month_return: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    dividend_yield: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    volume: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    market_cap: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    beta: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
    shares_issued: [
      {
        year: '',
        amount: 0.0,
        name: '',
        label: '',
        description: '',
      },
    ],
  },
  dividends_history: [
    {
      date: '',
      amount: 0.0,
      franking: 0.0,
      gross: 0.0,
      type: '',
      payable: '',
    },
  ],
  indicators_group: [
    {
      name: '',
      indicators: [
        {
          year: '',
          amount: 0.0,
          name: '',
          label: '',
          description: '',
        },
      ],
    },
  ],
  corporate_overview: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    details: [
      {
        label: 'Head Office',
        value: 'Sydney NSW 2000',
      },
      {
        label: 'Website',
        value: 'www.website.com.au',
      },
      {
        label: 'Registry',
        value: 'Link Market Services',
      },
      {
        label: 'Auditor',
        value: 'Lorem ipsum dolor sit amet.',
      },
      {
        label: 'Date Listed',
        value: '20/12/1988',
      },
    ],
  },
  price_data_history: {
    day: [
      {
        name: '',
        label: '',
        year: '',
        description: '',
        amount: 0.0,
      },
    ],
    three_months: [
      {
        name: '',
        label: '',
        year: '',
        description: '',
        amount: 0.0,
      },
    ],
    six_months: [
      {
        name: '',
        label: '',
        year: '',
        description: '',
        amount: 0.0,
      },
    ],
    one_year: [
      {
        name: '',
        label: '',
        year: '',
        description: '',
        amount: 0.0,
      },
    ],
    five_years: [
      {
        name: '',
        label: '',
        year: '',
        description: '',
        amount: 0.0,
      },
    ],
    ten_years: [
      {
        name: '',
        label: '',
        year: '',
        description: '',
        amount: 0.0,
      },
    ],
  },
  financials: {
    summary: [
      {
        name: '',
        group: [
          {
            year: '',
            amount: 0.0,
            name: '',
            label: '',
            description: '',
          },
        ],
      },
    ],
    income_statement: [
      {
        name: '',
        group: [
          {
            year: '',
            amount: 0.0,
            name: '',
            label: '',
            description: '',
          },
        ],
      },
    ],
    balance_sheet: [
      {
        name: '',
        group: [
          {
            year: '',
            amount: 0.0,
            name: '',
            label: '',
            description: '',
          },
        ],
      },
    ],
    cash_flow: [
      {
        name: '',
        group: [
          {
            year: '',
            amount: 0.0,
            name: '',
            label: '',
            description: '',
          },
        ],
      },
    ],
  },
};

export interface IHeadline {
  label: string;
  value: number;
}

export type TDividendsColumn = ColumnDef<Dividend>;

export type Dividend = {
  id?: ID;
  date: string;
  amount: number;
  franking: number;
  gross: number;
  type: string;
  payable: string;
};

export type CorporateOverview = {
  description: string;
  details: CorporateDetails[];
};

export interface CorporateDetails {
  label: string;
  value: string;
}

export interface PriceData {
  name: string;
  description: string;
  label: string;
  year: string;
  amount: number;
}

export interface PriceDataHistory {
  day: PriceData[];
  three_months: PriceData[];
  six_months: PriceData[];
  one_year: PriceData[];
  five_years: PriceData[];
  ten_years: PriceData[];
}

export interface FinancialsData {
  id?: ID;
  year: string;
  amount: number;
  name: string;
  description: string;
  label: string;
  history_data?: FinancialsData[];
}

export interface Financials {
  summary: FinancialsGroup[];
  income_statement: FinancialsGroup[];
  balance_sheet: FinancialsGroup[];
  cash_flow: FinancialsGroup[];
}

export type TFinancialColumn = ColumnDef<FinancialsData>;

export type FinancialsGroup = {
  id?: ID;
  name: string;
  group: FinancialsData[];
};

export type TForeignExchangeColumn = ColumnDef<ForeignExchange>;

export type ForeignExchange = {
  id?: ID;
  name: string;
  icon: string;
  amount: number;
};

export type Item = {
  id?: ID;
  amount_change: number;
  percentage: number;
};

export type ListItem = Company & Item;

export type TListColumn = ColumnDef<ListItem>;
