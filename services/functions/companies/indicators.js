import handler from "../../util/handler";

const INDICATORS = [
  "npat",
  "gross_margin",
  "ebitda_margin",
  "ebit_margin",
  "profit_margin",
  "roe",
  "roa",
  "roic",
  "pe",
  "price_to_book_ratio",
  "pe",
  "ev_ebitda",
  "ev_ebit",
  "eps",
  "growth_rate",
  "dividend_yield",
  "payout",
  "net_debt_ebitda",
  "net_debt_equity",
  "quick_ratio",
  "current_ratio",
  "net_debt",
  "gross_debt",
  "cash",
];

const INDICATOR_TEMPLATE = {
  current: 0.0,
  average: 0.0,
  min: 0.0,
  max: 0.0,
  archive: [
    { 2022: 0.0 },
    { 2021: 0.0 },
    { 2020: 0.0 },
    { 2019: 0.0 },
    { 2018: 0.0 },
    { 2017: 0.0 },
    { 2016: 0.0 },
    { 2015: 0.0 },
    { 2014: 0.0 },
    { 2013: 0.0 },
  ],
};

export const main = handler(async (event) => {
  const _indicators = INDICATORS.map((indicator) => {
    return { [indicator]: { ...INDICATOR_TEMPLATE } };
  });

  return _indicators;
});
