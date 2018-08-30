// tagged template literal helper, prevents undefined and null from being stringified

export const tag = (strings, ...values) => {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
};
