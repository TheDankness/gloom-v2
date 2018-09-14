import React from 'react';

const Checkboxes = props => {
  return (
    <span>
      <input type="checkbox" onChange={(perkID, status, boxID) => props.checkHandler(props.perkID, props.boxesChecked.box1, 'box1')} checked={props.boxesChecked.box1}/>
      {props.checkboxQty > 1 ? (
        <input
          type="checkbox"
          onChange={(perkID, status, boxID) => props.checkHandler(props.perkID, props.boxesChecked.box2, 'box2')}
          checked={props.boxesChecked.box2}
        />
      ) : null}
      {props.checkboxQty > 2 ? (
        <input
          type="checkbox"
          onChange={(perkID, status, boxID) => props.checkHandler(props.perkID, props.boxesChecked.box3, 'box3')}
          checked={props.boxesChecked.box3}
        />
      ) : null}
    </span>
  );
};

export default Checkboxes;
