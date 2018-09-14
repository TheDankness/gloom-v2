import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/character';

class Intro extends Component {

  componentDidMount() {
    this.fetchCharacter()
  }

  render() {
    const characters = this.props.charData.map(char => { <h1>{char.level}</h1> });
    return(
      <div>{characters}</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    charData: state.char.charData,
    token: state.auth.token,
    userID: state.auth.userID
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCharacter: (token, userID) => dispatch(actions.fetchCharacter(token, userID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);