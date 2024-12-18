export const isNotNumber = (value: any): boolean => isNaN(Number(value))

export const convertDecimalPoint = (v: number): string =>
  v.toString().replace('.', ',')
