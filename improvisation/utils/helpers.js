export function numberValidation(data) {
  let num = Number(data);
  return Number.isInteger(num) && num > 0;
}

export function emptyFieldValidation(data) {
  return data.trim().length !== 0;
}
