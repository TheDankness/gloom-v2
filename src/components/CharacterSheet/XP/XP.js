import React, {Component} from 'react';

import './XP.css';
import Box from '../../../hoc/Box/Box';
import XPBar from './XPBar/XPBar';

class XP extends Component {
  state = {
    modBy: '',
    placeholder: "ex. 10 or -15"
  }

  onChangeHandler = e => {
    this.setState({
      modBy: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();

    this.props.modifyXPByN(this.state.modBy);
    this.setState({
      ...this.state,
      modBy: ''
    });
  }

  render(){
  
    let xp = this.props.xp;
    let lvl1, lvl2, lvl3, lvl4, lvl5, lvl6, lvl7, lvl8, lvl9;
    lvl1 = lvl2 = lvl3 = lvl4 = lvl5 = lvl6 = lvl7 = lvl8 = lvl9 = 'Level';
    let xpMin = 0;
    let xpMax = 44;

    if (xp >= 0) {
      lvl1 = 'Level active';
      if (xp > 44) {
        lvl1 = 'Level crossed';
        lvl2 = 'Level active';
        xpMin = 45;
        xpMax = 94;
      }
      if (xp > 94) {
        lvl2 = 'Level crossed';
        lvl3 = 'Level active';
        xpMin = 95;
        xpMax = 149;
      }
      if (xp > 149) {
        lvl3 = 'Level crossed';
        lvl4 = 'Level active';
        xpMin = 150;
        xpMax = 209;
      }
      if (xp > 209) {
        lvl4 = 'Level crossed';
        lvl5 = 'Level active';
        xpMin = 210;
        xpMax = 274;
      }
      if (xp > 274) {
        lvl5 = 'Level crossed';
        lvl6 = 'Level active';
        xpMin = 275;
        xpMax = 324;
      }
      if (xp > 324) {
        lvl6 = 'Level crossed';
        lvl7 = 'Level active';
        xpMin = 325;
        xpMax = 419;
      }
      if (xp > 419) {
        lvl7 = 'Level crossed';
        lvl8 = 'Level active';
        xpMin = 420;
        xpMax = 499;
      }
      if (xp > 499) {
        lvl8 = 'Level crossed';
        lvl9 = 'Level active';
        xpMin = 500;
        xpMax = 1000;
      }
    }

    const xpPercentage = ((xp-xpMin)/((xpMax+1)-xpMin) * 100);

    return (
      <Box extraClasses="XP noFlex">
        <div className="CharacterLevel">
          <h3 className="inline">Level</h3>
          <ul className='levels'>
            <li className={lvl1}>1</li>
            <li className={lvl2}>2</li>
            <li className={lvl3}>3</li>
            <li className={lvl4}>4</li>
            <li className={lvl5}>5</li>
            <li className={lvl6}>6</li>
            <li className={lvl7}>7</li>
            <li className={lvl8}>8</li>
            <li className={lvl9}>9</li>
            { xp ===  45 || xp ===  95 || xp === 150 || xp === 210 || xp === 275 || xp === 325 || xp === 420 || xp === 500 ? (
                <li className="Level active levelUp">Level Up!</li> // A friendly notification that you leveled up!
              ) : null }
          </ul>
        </div>
        <div>
          <h3 className='inline'>XP</h3>
          <div className="CharacterXP">
            <div className='xpValue'>
              <button onClick={this.props.subOne} className="stepButton">-</button>
              <div className="xp">{this.props.xp}</div>
              <button onClick={this.props.addOne} className="stepButton">+</button>
            </div>
            <form onSubmit={this.onSubmit} className="modifyXP">
              <input className="modifyXP" type="number" name="modifyXP" placeholder={this.state.placeholder} value={this.state.modBy} onChange={this.onChangeHandler}/>
              <button className="modifyXP" onClick={this.onSubmit}>Modify</button>
            </form>
          </div>
          <XPBar xpPercentage={xpPercentage} xpMin={xpMin} xpMax={xpMax+1}/>
        </div>
      </Box>
    );
  };
};

export default XP;
