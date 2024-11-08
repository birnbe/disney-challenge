
export const arrayToQuotedString = (arr: string[]) => {
  return arr.map(str => `"${str}"`).join(', ');
};