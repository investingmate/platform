import { Response, ID } from '../../../../_investingmate/helpers';
import { ColumnDef } from '@tanstack/react-table';

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
  dividends_history: Dividend[];
  indicators_group: IndicatorGroup[];
  corporate_overview: CorporateOverview;
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
  history_data?: Indicator[];
};

export type CorporateOverview = {
  description: string;
  details: CorporateDetails[];
};

export interface CorporateDetails {
  label: string;
  value: string;
}
