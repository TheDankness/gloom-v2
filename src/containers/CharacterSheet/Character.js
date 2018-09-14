import React, { Component } from 'react';
import { connect } from 'react-redux';

import PerksList from '../../components/CharacterSheet/Perks/PerksList';
import ItemList from './ItemList/ItemList';
import XP from '../../components/CharacterSheet/XP/XP';
import CharInfo from '../../components/CharacterSheet/CharInfo/CharInfo';
import Gold from '../../components/CharacterSheet/Gold/Gold';

import './Character.css';
import * as actions from '../../store/actions/character';
import Loading from '../../components/UI/Loading/Loading';
import Aux from '../../hoc/Aux/Aux';
import Notes from '../../components/CharacterSheet/Notes/Notes';

class Character extends Component {

  componentDidMount() {
    this.props.fetchCharacter(this.props.token, this.props.userID);
  }

  render() {
    let sheetContents;

    if (this.props.loading) {
      sheetContents = <Loading loadingText='Loading Character Data...'/>;
    } else {
      sheetContents = (
        <Aux>
          <section className="Col1">
            <CharInfo
              charName={this.props.charData.name}
              charClass={this.props.charData.archetype}
              styles="noFlex"
            />
            <XP 
              xp={this.props.charData.xp} 
              subOne={() => this.props.modifyXP(-1)} 
              addOne={() => this.props.modifyXP(1)}
              modifyXPByN={(input) => this.props.modifyXP(input)}
              />
            <Gold 
              gold={this.props.charData.gold}
              subOne={() => this.props.modifyGold(-1)} 
              addOne={() => this.props.modifyGold(1)}
              modifyGoldByN={(input) => this.props.modifyGold(input)}
              />
            <ItemList
              charData={this.props.charData}
              addItem={(item, slot) => this.props.addItem(item, slot)} 
              buyItem={(input) => this.props.modifyGold(input)}/>
            </section>
          <section className="Col2">
            <PerksList charData={this.props.charData} checkPerk={this.props.checkPerk} />
            <Notes/>
          </section>
        </Aux>
      );
    }

    return <div className="Sheet">{sheetContents}</div>;
  }
}

const mapStateToProps = state => {
  return {
    id: state.char.id,
    charData: state.char.charData,
    loading: state.char.loading,
    success: state.char.success,
    userID: state.auth.userID,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacter: (token, userID) => dispatch(actions.fetchCharacter(token, userID)),
    modifyXP: input => dispatch(actions.modifyXP(input)),
    modifyGold: input => dispatch(actions.modifyGold(input)),
    addItem: (item, slot) => dispatch(actions.addItem(item, slot)),
    checkPerk: (perkID, status, boxID) => dispatch(actions.checkPerk(perkID, status, boxID)),
    saveChanges: (id, charData) => dispatch(actions.saveChanges(id, charData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Character);
