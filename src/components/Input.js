import React from 'react';

const Input = props => (
  <div className="mw-32 flex">
    <input
      className="input"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange} />
  </div>

);

export default Input;
