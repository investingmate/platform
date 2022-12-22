import axios, { AxiosResponse } from 'axios';
import moment from 'moment-timezone';
import { ID, Response } from '../../../../_investingmate/helpers';
import {
  Company,
  CompaniesQueryResponse,
  Dividend,
  Indicator,
  IndicatorGroup,
  PriceData,
} from './_models';
import { numberFormatter } from '../../../../utils/HelperFunctions';

const API_URL = process.env.REACT_APP_API_URL;
const COMPANY_URL = `${API_URL}/company`;

// const REACT_APP_AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN
// const GET_COMPANIES_URL = `${API_URL}companies`
// const GET_COMPANIES_URL = `${API_URL}/companies/query`

// console.log({REACT_APP_AUTH_DOMAIN})
// console.log({API_URL})
// console.log({GET_COMPANIES_URL})

const currentYear = 22;
const years = 10;

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const getDividendHistory = () => {
  const limit = Math.floor(Math.random() * 10) + 1;
  const data: Dividend[] = [];
  for (let index = 0; index <= limit; index++) {
    data.push({
      date: randomDate(new Date(2012, 1, 1), new Date()).toString(),
      amount: Math.floor(Math.random() * 10) + 1 + index,
      franking: Math.floor(Math.random() * 10) + 1 + index,
      gross: Math.floor(Math.random() * 10) + 1 + index,
      type: Math.floor(Math.random() * 10) + 1 + (index % 2) === 0 ? 'Final' : 'Interim',
      payable: randomDate(new Date(2012, 1, 1), new Date()).toString(),
    });
  }
  return data;
};

const indicatorGroup = ['VALUATION'];
const indicators = ['D.Y', 'P/L', 'PEG RATIO', 'P/VP', 'EV/EBITDA'];

const getIndicators = () => {
  const indicatorGroups: IndicatorGroup[] = [];

  indicatorGroup.forEach((ind) => {
    const data: Indicator[] = [];
    indicators.forEach((ind, index) => {
      const historyData = [];
      for (let i = 0; i < years; i++) {
        historyData.push({
          year: `20${currentYear - i}`,
          label: `20${currentYear - i}`,
          amount: Math.floor(Math.random() * 10) + 1 + index,
          name: ind,
          description: `Description about: ${ind}`,
        });
      }
      data.push({
        year: `20${currentYear}`,
        label: `20${currentYear}`,
        amount: Math.floor(Math.random() * 10) + 1 + index,
        name: ind,
        description: `Description about: ${ind}`,
        history_data: historyData,
      });
    });
    indicatorGroups.push({
      name: ind,
      indicators: data,
    });
  });
  return indicatorGroups;
};

// @ts-ignore
const slugfy = (name) => {
  if (!name) return null;
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return (
    name
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      // @ts-ignore
      .replace(p, (c) => b.charAt(a.indexOf(c)))
      .replace(/&/g, '-and-')
      // eslint-disable-next-line
      .replace(/[^\w\-]+/g, '')
      // eslint-disable-next-line
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  );
};

const COMPANIES = [
  'Lotus Resources Ltd',
  'Global Lithium Resources Ltd',
  'Core Lithium Ltd',
  'Lake Resources N.L.',
  'Hawsons Iron Ltd',
  'Bannerman Energy Ltd',
  'Paladin Energy Ltd',
  'Boss Energy Ltd',
  'Metals X Ltd',
  'Leo Lithium Ltd',
];

const COMPANY_TEMPLATE = {
  logo: '',
  name: '',
  ticker: '',
  sector: '',
  exchange: '',
  website: '',
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
  corporate_overview: '',
};

const getHistoryData = (label: string) => {
  const historyData = [];
  for (let i = 0; i < years; i++) {
    historyData.push({
      year: `20${currentYear - i}`,
      label: `20${currentYear - i}`,
      amount: numberFormatter(Math.floor(Math.random() * 10) + 1),
      name: label,
      description: `Description about: ${label}`,
    });
  }
  return historyData;
};

const getPriceData = (filter: string) => {
  const today = new Date();
  // starting ASX
  const weekDay = moment(today).format('ddd');
  const month = moment(today).format('MMM');
  const day = moment(today).format('D');
  const year = moment(today).get('year');
  const time = '9:45:00';
  const date = `${weekDay} ${month} ${day} ${year} ${time} GMT+1100 (Australian Eastern Daylight Time)`;

  const priceData: PriceData[] = [];

  if (filter === 'day') {
    const priceCounter = 6 * 4;
    // There are approximately 260 weekdays in one year.
    for (let i = 1; i <= priceCounter + 1; i++) {
      const currentDate = moment(date)
        .add(15 * i, 'minutes')
        .tz('Australia/Sydney');
      priceData.push({
        name: 'Price',
        label: currentDate.format('hh:mm'),
        year: year.toString(),
        description: currentDate.format(),
        amount: numberFormatter(parseFloat((Math.random() * (100 - 95) + 95).toFixed(2))),
      });
    }
  } else if (filter === 'three_months') {
    const priceCounter = 6 * 4;
    // There are approximately 260 weekdays in one year.
    for (let i = 1; i <= priceCounter + 1; i++) {
      const currentDate = moment(date)
        .add(15 * i, 'minutes')
        .tz('Australia/Sydney');
      priceData.push({
        name: 'Price',
        label: currentDate.format('DD/MM'),
        year: year.toString(),
        description: currentDate.format(),
        amount: numberFormatter(parseFloat((Math.random() * (100 - 95) + 95).toFixed(2))),
      });
    }
  } else if (filter === 'six_months') {
    const priceCounter = 6 * 4;
    // There are approximately 260 weekdays in one year.
    for (let i = 1; i <= priceCounter + 1; i++) {
      const currentDate = moment(date)
        .add(15 * i, 'minutes')
        .tz('Australia/Sydney');
      priceData.push({
        name: 'Price',
        label: currentDate.format('DD/MM'),
        year: year.toString(),
        description: currentDate.format(),
        amount: numberFormatter(parseFloat((Math.random() * (100 - 95) + 95).toFixed(2))),
      });
    }
  } else if (filter === 'one_year') {
    const priceCounter = 6 * 4;
    // There are approximately 260 weekdays in one year.
    for (let i = 1; i <= priceCounter + 1; i++) {
      const currentDate = moment(date)
        .add(15 * i, 'minutes')
        .tz('Australia/Sydney');
      priceData.push({
        name: 'Price',
        label: currentDate.format('MM'),
        year: year.toString(),
        description: currentDate.format(),
        amount: numberFormatter(parseFloat((Math.random() * (100 - 95) + 95).toFixed(2))),
      });
    }
  } else if (filter === 'five_years') {
    const priceCounter = 6 * 4;
    // There are approximately 260 weekdays in one year.
    for (let i = 1; i <= priceCounter + 1; i++) {
      const currentDate = moment(date)
        .add(15 * i, 'minutes')
        .tz('Australia/Sydney');
      priceData.push({
        name: 'Price',
        label: currentDate.format('YY'),
        year: year.toString(),
        description: currentDate.format(),
        amount: numberFormatter(parseFloat((Math.random() * (100 - 95) + 95).toFixed(2))),
      });
    }
  } else if (filter === 'ten_years') {
    const tenYears = moment().subtract(10, 'years').tz('Australia/Sydney').format();
    const priceCounter = 6 * 4;
    // There are approximately 260 weekdays in one year.
    for (let i = 1; i <= priceCounter + 1; i++) {
      const currentDate = moment(date)
        .add(15 * i, 'minutes')
        .tz('Australia/Sydney');
      priceData.push({
        name: 'Price',
        label: currentDate.format('YY'),
        year: year.toString(),
        description: currentDate.format(),
        amount: numberFormatter(parseFloat((Math.random() * (100 - 95) + 95).toFixed(2))),
      });
    }
  }
  return priceData;
};

const _companies = COMPANIES.map((company, index) => {
  let sector = company.split(' ').join('').substring(5, 10).toLowerCase();
  sector = sector[0].toUpperCase() + sector.slice(1);
  let exchange = company.split(' ').join('').substring(7, 12).toLowerCase();
  exchange = exchange[0].toUpperCase() + exchange.slice(1);
  const website = `https://www.${company.split(' ').join('').toLowerCase()}.com`;

  const dividends = getDividendHistory();
  const indicators = getIndicators();

  return {
    [slugfy(company)]: {
      ...COMPANY_TEMPLATE,
      name: company,
      sector,
      exchange,
      website,
      ticker: company.split(' ').join('').substring(0, 4).toUpperCase(),
      headline: {
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
      },
      headlines_history: {
        current: getHistoryData('current'),
        variation: getHistoryData('variation'),
        min_12_months: getHistoryData('min_12_months'),
        max_12_months: getHistoryData('max_12_months'),
        year_return: getHistoryData('year_return'),
        current_month_return: getHistoryData('current_month_return'),
        dividend_yield: getHistoryData('dividend_yield'),
        volume: getHistoryData('volume'),
        market_cap: getHistoryData('market_cap'),
        beta: getHistoryData('beta'),
        shares_issued: getHistoryData('shares_issued'),
      },
      dividends_history: dividends,
      indicators_group: indicators,
      corporate_overview: {
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        details: [
          {
            label: 'Head Office',
            value: 'Sydney NSW 2000',
          },
          {
            label: 'Website',
            value: website,
          },
          {
            label: 'Registry',
            value: 'Link Market Services',
          },
          {
            label: 'Auditor',
            value: 'Lorem ipsum dolor sit amet.',
          },
          {
            label: 'Date Listed',
            value: '20/12/1988',
          },
        ],
      },
      price_data_history: {
        day: getPriceData('day'),
        three_months: getPriceData('three_months'),
        six_months: getPriceData('six_months'),
        one_year: getPriceData('one_year'),
        five_years: getPriceData('five_years'),
        ten_years: getPriceData('ten_years'),
      },
    },
  };
});

const getCompanies = (query: string): Promise<CompaniesQueryResponse> => {
  // return axios
  //   .get(`${GET_COMPANIES_URL}`)
  //   // .get(`${GET_COMPANIES_URL}?${query}`)
  //   .then((d: AxiosResponse<CompaniesQueryResponse>) => d.data)
  const arrayOfCompanies: Company[] = [];
  _companies.forEach((company, index) => {
    if (company && Object.values(company) && Object.values(company).length > 0) {
      const companyObj = Object.values(company)[0];
      arrayOfCompanies.push(companyObj as Company);
    }
  });
  // @ts-ignore
  return { data: arrayOfCompanies };
};

const getCompanyById = (id: ID): Promise<Company | undefined> => {
  return axios
    .get(`${COMPANY_URL}/${id}`)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data);
};

const createCompany = (Company: Company): Promise<Company | undefined> => {
  return axios
    .put(COMPANY_URL, Company)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data);
};

const updateCompany = (Company: Company): Promise<Company | undefined> => {
  return axios
    .post(`${COMPANY_URL}/${Company.id}`, Company)
    .then((response: AxiosResponse<Response<Company>>) => response.data)
    .then((response: Response<Company>) => response.data);
};

const deleteCompany = (CompanyId: ID): Promise<void> => {
  return axios.delete(`${COMPANY_URL}/${CompanyId}`).then(() => {});
};

const deleteSelectedCompanies = (ids: Array<ID>): Promise<void> => {
  const requests = ids.map((id) => axios.delete(`${COMPANY_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getCompanies,
  deleteCompany,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteSelectedCompanies,
};
