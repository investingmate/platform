import {TColumn} from "../../../core/_models";

export const defaultColumns: TColumn[] = [
  {
    accessorKey: 'logo',
    id: 'logo',
    header: '',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.ticker,
    id: 'ticker',
    header: 'Ticker',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.name,
    id: 'name',
    header: 'Name',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.sector,
    id: 'sector',
    header: 'Sector',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.exchange,
    id: 'exchange',
    header: 'Exchange',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.website,
    id: 'website',
    header: 'Website',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.current,
    id: 'current',
    header: 'Current',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.variation,
    id: 'variation',
    header: 'Variation',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.min_12_months,
    id: 'min_12_months',
    header: 'Min 12 months',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.max_12_months,
    id: 'max_12_months',
    header: 'Max 12 months',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.year_return,
    id: 'year_return',
    header: 'Year return',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.current_month_return,
    id: 'current_month_return',
    header: 'Current month return',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.dividend_yield,
    id: 'dividend_yield',
    header: 'Dividend yield',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.volume,
    id: 'volume',
    header: 'Volume',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.market_cap,
    id: 'market_cap',
    header: 'Market cap',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.beta,
    id: 'beta',
    header: 'Beta',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.headline.shares_issued,
    id: 'shares_issued',
    header: 'Shares issued',
    cell: info => info.getValue(),
  },
]
