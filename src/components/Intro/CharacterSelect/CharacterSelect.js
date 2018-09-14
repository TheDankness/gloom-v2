import React from 'react';

const characterSelect = props => {
  return (
    {props.characters.map(char => {
      <li>char.name</li>
    })}
  )
}

export default characterSelect;