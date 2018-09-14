import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SelectClass from './SelectClass/SelectClass';
import Loading from '../../UI/Loading/Loading';
import * as actions from '../../../store/actions/character';
import './NewCharacter.css';

class NewCharacter extends Component {
  state = {
    charName: '',
    selectedClass: '',
    availableClasses: [
      {
        name: 'Brute',
        slug: 'brute'
      },
      {
        name: 'Spellweaver',
        slug: 'spellweaver'
      },
      {
        name: 'Mindthief',
        slug: 'mindthief'
      },
      {
        name: 'Scoundrel',
        slug: 'scoundrel'
      },
      {
        name: 'Tinkerer',
        slug: 'tinkerer'
      },
      {
        name: 'Cragheart',
        slug: 'cragheart'
      }
    ]
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSelectClass = selectedClass => {
    this.setState({
      selectedClass: selectedClass
    });
  };

  onCreateHandler = (name, selectedClass) => {
    this.props.onCreateChar(name, selectedClass);
  };

  render() {
    if (this.props.charData !== {}) {
      return <Redirect to={'/character'} />;
    } else 
    if (this.props.loading) {
      return <Loading loadingText="Creating Character..."/>;
    }

    return (
      <div className="Intro">
        <h2>Character Name:</h2>
        <input
          type="text"
          name="charName"
          value={this.state.charName}
          onChange={this.onChange}
        />
        <h2>Select an Archetype</h2>
        <SelectClass
          classes={this.state.availableClasses}
          clickHandler={this.onSelectClass}
          selectedClass={this.state.selectedClass}
        />
        <button
          onClick={() =>
            this.onCreateHandler(this.state.charName, this.state.selectedClass)
          }>
          Create Character
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.char.loading,
    charID: state.char.id,
    success: state.char.success,
    charData: state.char.charData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateChar: (name, selectedClass) => dispatch(actions.getPerks(name, selectedClass))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCharacter);
