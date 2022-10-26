import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_investingmate/helpers'
import {Company, CompaniesQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const REACT_APP_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
const COMPANY_URL = `${API_URL}/company`
const GET_COMPANIES_URL = `${API_URL}companies`
// const GET_COMPANIES_URL = `${API_URL}/companies/query`

console.log({REACT_APP_AUTH_DOMAIN})
console.log({API_URL})
console.log({GET_COMPANIES_URL})

// @ts-ignore
const slugfy = (name) => {
  if (!name) return null;
  const a = "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;";
  const b = "aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return name
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    // @ts-ignore
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

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
    current: Math.floor(Math.random() * 10) + 1,
    variation: Math.floor(Math.random() * 10) + 1,
    min_12_months: Math.floor(Math.random() * 10) + 1,
    max_12_months: Math.floor(Math.random() * 10) + 1,
    year_return: Math.floor(Math.random() * 10) + 1,
    current_month_return: Math.floor(Math.random() * 10) + 1,
    dividend_yield: Math.floor(Math.random() * 10) + 1,
    volume: Math.floor(Math.random() * 10) + 1,
    market_cap: Math.floor(Math.random() * 10) + 1,
    beta: Math.floor(Math.random() * 10) + 1,
    shares_issued: Math.floor(Math.random() * 10) + 1,
  },
};

const _companies = COMPANIES.map((company, index) => {
  let sector = company.split(" ").join("").substring(5, 10).toLowerCase()
  sector = sector[0].toUpperCase() + sector.slice(1);
  let exchange = company.split(" ").join("").substring(7, 12).toLowerCase()
  exchange = exchange[0].toUpperCase() + exchange.slice(1);
  const website = `https://www.${company.split(" ").join("").toLowerCase()}.com`;
  return {
    [slugfy(company)]: {
      ...COMPANY_TEMPLATE,
      name: company,
      sector,
      exchange,
      website,
      ticker: company.split(" ").join("").substring(0, 4).toUpperCase(),
      headline:{
        current: Math.floor(Math.random() * 10) + 1 + index,
        variation: Math.floor(Math.random() * 10) + 1 + index,
        min_12_months: Math.floor(Math.random() * 10) + 1 + index,
        max_12_months: Math.floor(Math.random() * 10) + 1 + index,
        year_return: Math.floor(Math.random() * 10) + 1 + index,
        current_month_return: Math.floor(Math.random() * 10) + 1 + index,
        dividend_yield: Math.floor(Math.random() * 10) + 1 + index,
        volume: Math.floor(Math.random() * 10) + 1 + index,
        market_cap: Math.floor(Math.random() * 10) + 1 + index,
        beta: Math.floor(Math.random() * 10) + 1 + index,
        shares_issued: Math.floor(Math.random() * 10) + 1 + index,
      }
    },
  };
});

const getCompanies = (query: string): Promise<CompaniesQueryResponse> => {
  // return axios
  //   .get(`${GET_COMPANIES_URL}`)
  //   // .get(`${GET_COMPANIES_URL}?${query}`)
  //   .then((d: AxiosResponse<CompaniesQueryResponse>) => d.data)
  const arrayOfCompanies: Company[] = []
  _companies.forEach((company,index) => {
    if(company && Object.values(company) && Object.values(company).length > 0){
      const companyObj = Object.values(company)[0]
      arrayOfCompanies.push(companyObj as Company)
    }
  })
  // @ts-ignore
  return {data: arrayOfCompanies}
}

const getCompanyById = (id: ID): Promise<Company | undefined> => {
  return axios
    .get(`${COMPANY_URL}/${id}`)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data)
}

const createCompany = (Company: Company): Promise<Company | undefined> => {
  return axios
    .put(COMPANY_URL, Company)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data)
}

const updateCompany = (Company: Company): Promise<Company | undefined> => {
  return axios
    .post(`${COMPANY_URL}/${Company.id}`, Company)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data)
}

const deleteCompany = (CompanyId: ID): Promise<void> => {
  return axios.delete(`${COMPANY_URL}/${CompanyId}`).then(() => {})
}

const deleteSelectedCompanies = (ids: Array<ID>): Promise<void> => {
  const requests = ids.map((id) => axios.delete(`${COMPANY_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getCompanies, deleteCompany, getCompanyById, createCompany, updateCompany, deleteSelectedCompanies}
