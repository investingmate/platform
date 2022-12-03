import {Company} from "./_models";
import {Location} from "history";

/**
 * Getting the company details from state
 * */
export const getCurrentCompany = (location: Location) => {
  let company: Company | undefined = undefined;
  let state: any;
  if(location && location.state){
    state = location.state
    if(state && state.company)
      company = state.company && JSON.parse(state.company);
  }
  return company
}
