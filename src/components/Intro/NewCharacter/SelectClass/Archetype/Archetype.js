import React from 'react';

import './Archetype.css';
import SVGIcon from '../../../../UI/svgIcon/svgIcon';

const selectableClass = props => {
  return (
    <div
      className={
        props.selectedClass === props.slug ? 'Archetype Selected' : 'Archetype'
      }
      onClick={() => props.clickHandler(props.slug)}>
      <h4>{props.arch}</h4>
      <SVGIcon icon={props.slug} fillColor="#FFFFFF" />
    </div>
  );
};

export default selectableClass;
