import React, {Component} from 'react';

import './Gold.css';
import Box from '../../../hoc/Box/Box';

class Gold extends Component {
  state = {
    modBy: '',
    placeholder: 'ex. 10 or -15'
  }

  onChangeHandler = e => {
    this.setState({
      ...this.state,
      modBy: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.modifyGoldByN(this.state.modBy);
    this.setState({
      ...this.state,
      modBy: ''
    })
  }

  render(){
    return (
      <Box extraClasses="Gold noFlex">
        <h3>Gold</h3>
        <div className="CharacterGold">
          <div className='goldValue'>
            <button onClick={this.props.subOne} className="stepButton">-</button>
            <div className="gold">{this.props.gold}</div>
            <button onClick={this.props.addOne} className="stepButton">+</button>
          </div>
          <form onSubmit={this.onSubmit} className="modifyXP">
            <input className="modifyXP" type="number" name="modifyXP" placeholder={this.state.placeholder} value={this.state.modBy} onChange={this.onChangeHandler}/>
            <button className="modifyXP" onClick={this.onSubmit}>Modify</button>
          </form>
        </div>
      </Box>
    )
  }
}

export default Gold;