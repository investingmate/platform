export const customStringfy = (str: string) => {
  let newStr = str.replaceAll("_", ' ')
  return newStr[0].toUpperCase() + newStr.slice(1);
}
