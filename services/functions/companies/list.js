import handler from "../../util/handler";

export const main = handler(async (event) => {
  return [
    {
      id: 000001,
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
    },
  ];
});
