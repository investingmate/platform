
export const customStringfy = (str: string) => {
  let newStr = str.replaceAll("_", ' ');
  return newStr[0].toUpperCase() + newStr.slice(1);
}

export const createArrayOfYears = (): number[] => {
  const totalYears = 15;
  const currentYear = new Date().getFullYear();
  const firstYear = currentYear - totalYears;
  const arrayOfYears = [];
  for (let i = 0; i <= totalYears; i++){
      let year = firstYear + i;
      arrayOfYears.push(year);
  }
  return arrayOfYears;
}

export const createArrayOfData = (): number[] => {
  const total = 15;
  const arrayOfData = [];
  for (let i = 0; i <= total; i++){
    const data = Math.floor(Math.random() * 10) + i;
     arrayOfData.push(data);
  }
  return arrayOfData;
}
