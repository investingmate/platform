import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../_investingmate/helpers'
import {Company, CompaniesQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const COMPANY_URL = `${API_URL}/company`
const Company_URL = `${API_URL}/Company`
const GET_COMPANIES_URL = `${API_URL}companies/list`
// const GET_COMPANIES_URL = `${API_URL}/companies/query`

console.log({API_URL})
console.log({GET_COMPANIES_URL})

const getCompanies = (query: string): Promise<CompaniesQueryResponse> => {
  return axios
    .get(`${GET_COMPANIES_URL}`)
    // .get(`${GET_COMPANIES_URL}?${query}`)
    .then((d: AxiosResponse<CompaniesQueryResponse>) => d.data)
}

const getCompanyById = (id: ID): Promise<Company | undefined> => {
  return axios
    .get(`${Company_URL}/${id}`)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data)
}

const createCompany = (Company: Company): Promise<Company | undefined> => {
  return axios
    .put(Company_URL, Company)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data)
}

const updateCompany = (Company: Company): Promise<Company | undefined> => {
  return axios
    .post(`${Company_URL}/${Company.id}`, Company)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data)
}

const deleteCompany = (CompanyId: ID): Promise<void> => {
  return axios.delete(`${Company_URL}/${CompanyId}`).then(() => {})
}

const deleteSelectedCompanies = (ids: Array<ID>): Promise<void> => {
  const requests = ids.map((id) => axios.delete(`${COMPANY_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getCompanies, deleteCompany, getCompanyById, createCompany, updateCompany, deleteSelectedCompanies}
