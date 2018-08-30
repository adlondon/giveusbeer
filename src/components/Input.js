import React from 'react';

const Input = props => (
  <input
    className="input"
    value={props.value}
    placeholder={props.placeholder}
    onChange={props.onChange} />
);

export default Input;
