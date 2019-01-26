export function formatNumber(number, precision = 0)  {
  if (Number.isNaN(Number(number)) || number === null) {
    return NaN;
  }

  return Number(number).toFixed(precision).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',');
}
