import React, { Component } from 'react';

import './Perks.css';
import Perk from './Perk';
import Box from '../../../hoc/Box/Box';

class PerksList extends Component {
  render() {
    return (
      <Box extraClasses='noFlex'>
        <h2>Perks</h2>
        <div>
          {this.props.charData.perks.map((perk, i) => {
            return (
              <Perk
                perkText={perk.perkText}
                checkboxQty={perk.checkboxQty}
                boxesChecked={perk.boxesChecked}
                checkHandler={this.props.checkPerk}
                key={i}
                perkID={i}
              />
            );
          })}
        </div>
      </Box>
    );
  }
}

export default PerksList;
