export const tag = (strings, ...values) => {
  console.log(values);
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
};
