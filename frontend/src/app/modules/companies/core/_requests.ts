import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_investingmate/helpers'
import {Company, CompaniesQueryResponse} from './_models'

const data = [{"lotus-resources-ltd":{"logo":"","name":"Lotus Resources Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"global-lithium-resources-ltd":{"logo":"","name":"Global Lithium Resources Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"core-lithium-ltd":{"logo":"","name":"Core Lithium Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"lake-resources-nl":{"logo":"","name":"Lake Resources N.L.","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"hawsons-iron-ltd":{"logo":"","name":"Hawsons Iron Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"bannerman-energy-ltd":{"logo":"","name":"Bannerman Energy Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"paladin-energy-ltd":{"logo":"","name":"Paladin Energy Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"boss-energy-ltd":{"logo":"","name":"Boss Energy Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"metals-x-ltd":{"logo":"","name":"Metals X Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}},{"leo-lithium-ltd":{"logo":"","name":"Leo Lithium Ltd","ticker":"","sector":"","exchange":"","website":"","headline":{"current":0,"variation":0,"min_12_months":0,"max_12_months":0,"year_return":0,"current_month_return":0,"dividend_yield":0,"volume":0,"market_cap":0,"beta":0,"shares_issued":0}}}]
const API_URL = process.env.REACT_APP_API_URL
const REACT_APP_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
const COMPANY_URL = `${API_URL}/company`
const GET_COMPANIES_URL = `${API_URL}companies`
// const GET_COMPANIES_URL = `${API_URL}/companies/query`

console.log({REACT_APP_AUTH_DOMAIN})
console.log({API_URL})
console.log({GET_COMPANIES_URL})

const getCompanies = (query: string): Promise<CompaniesQueryResponse> => {
  // return axios
  //   .get(`${GET_COMPANIES_URL}`)
  //   // .get(`${GET_COMPANIES_URL}?${query}`)
  //   .then((d: AxiosResponse<CompaniesQueryResponse>) => d.data)
  const arrayOfCompanies: Company[] = []
  data.forEach((company,index) => {
    if(company && Object.values(company) && Object.values(company).length > 0){
      const companyObj = Object.values(company)[0]
      arrayOfCompanies.push(companyObj)
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
