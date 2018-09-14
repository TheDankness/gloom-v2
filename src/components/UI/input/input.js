import React from 'react';

const input = (props) => {
  let newInput = null;

  switch(props.type) {
    case ('text'):
      newInput = <input type="text" {...props} value={props.value} onChange={props.onChange}/>;
      break;
    default:
      newInput = <input type="text" {...props}/>;
      break;
  }
  
  return(
    <input inputType="text" value={props.value} onChange={props.onChange} />
  )
}

export default input;