export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100
