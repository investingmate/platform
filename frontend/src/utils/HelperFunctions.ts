import { Company } from '../app/modules/companies/core/_models';
import moment from 'moment';
import { FilterFn } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

export const customStringfy = (str: string) => {
  let newStr = str.replaceAll('_', ' ');
  return newStr[0].toUpperCase() + newStr.slice(1);
};

export const numberFormatter = (num: number): number => {
  return parseFloat(num.toFixed(2));
};

export const sortArrayOfObjects = (arr: any[], key: any) => {
  return arr.sort((a, b) => (a[key] > b[key] ? 1 : -1));
};

export const createArrayOfYears = (): number[] => {
  const totalYears = 15;
  const currentYear = new Date().getFullYear();
  const firstYear = currentYear - totalYears;
  const arrayOfYears = [];
  for (let i = 0; i <= totalYears; i++) {
    let year = firstYear + i;
    arrayOfYears.push(year);
  }
  return arrayOfYears;
};

export const createArrayOfData = (): number[] => {
  const total = 15;
  const arrayOfData = [];
  for (let i = 0; i <= total; i++) {
    const data = Math.floor(Math.random() * 10) + i;
    arrayOfData.push(data);
  }
  return arrayOfData;
};

export const addToWatchlist = (company: Company) => {
  const list = localStorage.getItem('watchList');
  if (!list) {
    localStorage.setItem('watchList', JSON.stringify([]));
  }
  const newList = localStorage.getItem('watchList');
  if (newList) {
    const findIndex = JSON.parse(newList).findIndex(
      (i: Company) => i && i.ticker === company.ticker
    );
    if (findIndex === -1) {
      const list = JSON.parse(newList);
      list.push(company);
      localStorage.setItem('watchList', JSON.stringify(list));
    }
  }
};

export const removeFromWatchlist = (company: Company) => {
  const newList = localStorage.getItem('watchList');
  if (newList) {
    const filtered = JSON.parse(newList).filter((i: Company) => i && i.ticker !== company.ticker);
    if (filtered) {
      localStorage.setItem('watchList', JSON.stringify(filtered));
    }
  }
};

export const dateFormatter = (date: any) => {
  return moment(date).format('DD/MM/YYYY');
};

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta({
    itemRank,
  });
  // Return if the item should be filtered in/out
  return itemRank.passed;
};
