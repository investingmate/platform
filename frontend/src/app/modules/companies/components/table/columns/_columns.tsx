import {TColumn} from "../../../core/_models";
const MIN_SIZE = 200;

export const defaultColumns: TColumn[] = [
  {
    accessorKey: 'logo',
    id: 'logo',
    header: '',
    cell: info => info.getValue(),
    size: 50,
  },
  {
    accessorFn: row => row.ticker,
    id: 'ticker',
    header: 'Ticker',
    cell: info => info.getValue(),
    size: 100,
  },
  {
    accessorFn: row => row.name,
    id: 'name',
    header: 'Name',
    cell: info => info.getValue(),
    size: 250,
  },
  {
    accessorFn: row => row.sector,
    id: 'sector',
    header: 'Sector',
    cell: info => info.getValue(),
    size: 200,
  },
  {
    accessorFn: row => row.exchange,
    id: 'exchange',
    header: 'Exchange',
    cell: info => info.getValue(),
    size: 150,
  },
  {
    accessorFn: row => row.website,
    id: 'website',
    header: 'Website',
    cell: info => info.getValue(),
    size: 200,
  },
  {
    accessorFn: row => row.headline.current,
    id: 'current',
    header: 'Current',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.variation,
    id: 'variation',
    header: 'Variation',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.min_12_months,
    id: 'min_12_months',
    header: 'Min 12 months',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.max_12_months,
    id: 'max_12_months',
    header: 'Max 12 months',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.year_return,
    id: 'year_return',
    header: 'Year return',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.current_month_return,
    id: 'current_month_return',
    header: 'Month return',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.dividend_yield,
    id: 'dividend_yield',
    header: 'Dividend yield',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.volume,
    id: 'volume',
    header: 'Volume',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.market_cap,
    id: 'market_cap',
    header: 'Market cap',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.beta,
    id: 'beta',
    header: 'Beta',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
  {
    accessorFn: row => row.headline.shares_issued,
    id: 'shares_issued',
    header: 'Shares issued',
    cell: info => info.getValue(),
    size: MIN_SIZE,
  },
]


export const defaultColumnsDescription: TColumn[] = [
  {
    id: 'ticker',
    description: 'Here we can put a description about: Ticker',
  },
  {
    id: 'name',
    description: 'Here we can put a description about: Name',
  },
  {
    id: 'sector',
    description: 'Here we can put a description about: Sector',
  },
  {
    id: 'exchange',
    description: 'Here we can put a description about: Exchange',
  },
  {
    id: 'website',
    description: 'Here we can put a description about: Website',
  },
  {
    id: 'current',
    description: 'Here we can put a description about: Current',
  },
  {
    id: 'variation',
    description: 'Here we can put a description about: Variation',
  },
  {
    id: 'min_12_months',
    description: 'Here we can put a description about: Min 12 months',
  },
  {
    id: 'max_12_months',
    description: 'Here we can put a description about: Max 12 months',
  },
  {
    id: 'year_return',
    description: 'Here we can put a description about: Year return',
  },
  {
    id: 'current_month_return',
    description: 'Here we can put a description about: Month return',
  },
  {
    id: 'dividend_yield',
    description: 'Here we can put a description about: Dividend yield',
  },
  {
    id: 'volume',
    description: 'Here we can put a description about: Volume',
  },
  {
    id: 'market_cap',
    description: 'Here we can put a description about: Market cap',
  },
  {
    id: 'beta',
    description: 'Here we can put a description about: Beta',
  },
  {
    id: 'shares_issued',
    description: 'Here we can put a description about: Shares issued',
  },
]
