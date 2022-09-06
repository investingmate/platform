import { slugfy } from "../../util/slugfy";
import handler from "../../util/handler";

const COMPANIES = [
  "Lotus Resources Ltd",
  "Global Lithium Resources Ltd",
  "Core Lithium Ltd",
  "Lake Resources N.L.",
  "Hawsons Iron Ltd",
  "Bannerman Energy Ltd",
  "Paladin Energy Ltd",
  "Boss Energy Ltd",
  "Metals X Ltd",
  "Leo Lithium Ltd",
];

const COMPANY_TEMPLATE = {
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
};

export const main = handler(async (event) => {
  const _companies = COMPANIES.map((company) => {
    return {
      [slugfy(company)]: { ...COMPANY_TEMPLATE, name: company },
    };
  });

  return _companies;
});
