import React from 'react';

import Archetype from './Archetype/Archetype';
import './SelectClass.css';

const selectClass = props => {
  return (
    <div className="Archetypes">
      {props.classes.map(c => {
        return (
          <Archetype
            arch={c.name}
            slug={c.slug}
            key={c.slug}
            clickHandler={props.clickHandler}
            selectedClass={props.selectedClass}
          />
        );
      })}
    </div>
  );
};

export default selectClass;
