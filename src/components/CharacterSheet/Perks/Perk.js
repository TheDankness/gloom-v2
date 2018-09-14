import React, { Component } from 'react';

import Checkboxes from './Checkboxes';
import './Perks.css';

class Perk extends Component {
  render() {
    return (
      <div className="perk">
        <Checkboxes checkboxQty={this.props.checkboxQty} boxesChecked={this.props.boxesChecked} checkHandler={this.props.checkHandler} perkID={this.props.perkID}/>
        <label className="perk">{this.props.perkText}</label>
      </div>
    );
  }
}

export default Perk;
