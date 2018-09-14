import React from 'react';

import './XPBar.css';

const xpBar = props => {
  return (
    <div className='XPBarWrapper'>
      <div className='xpMin'>{props.xpMin}</div>
      <div className='XPBar'>
        <div className='XPFill' style={{width:  props.xpPercentage+'%'}}></div>
      </div>
      <div className='xpMax'>{props.xpMax}</div>
    </div>
  )
}

export default xpBar;