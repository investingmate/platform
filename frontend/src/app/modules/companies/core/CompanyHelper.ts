import {Company, Indicator} from "./_models";

/**
 * Getting the company indicator history
 * */
export const getCompanyIndicatorHistory = (company: Company, label: string) => {
  let history: Indicator[] | undefined = [];

  if(company.indicators_group){
    company.indicators_group.forEach(group => {
      group && group.indicators && group.indicators.forEach((ind => {
        if(ind.name === label)
          history = ind.history_data
      }))
    })
  }
  return history;
};

/**
 * Getting the Headline History
 * */
export const getHeadlineHistory = (company: Company, label: string) => {
  let history: Indicator[] | undefined = [];

  if(company.headlines_history){
    let newText = label.split(' ').join('_');
    const key = newText.toLowerCase()
    // @ts-ignore
    history = company.headlines_history[key]
  }
  return history;
};
