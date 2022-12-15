import { Company, initialCompany } from './_models';
import { Location } from 'history';

/**
 * Getting the company details from state
 * */
export const getCurrentCompany = (location: Location) => {
  console.log('getCurrentCompany');
  let company: Company = initialCompany;
  let state: any;
  if (location && location.state) {
    state = location.state;
    if (state && state.company) company = state.company && JSON.parse(state.company);
  }
  return company;
};
