export const isNotNumber = (value: string): boolean => isNaN(Number(value));

export const convertDecimalPoint = (v: number): string =>
  v.toString().replace('.', ',');
