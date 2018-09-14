import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as authActions from '../../../store/actions/auth';
import * as charActions from '../../../store/actions/character';
import SVGIcon from '../../UI/svgIcon/svgIcon';
import './Nav.css';

class Nav extends Component {
  render() {
    if (this.props.token){
      return (
        <ul className="Nav">
          <li className="navLeft">
            <SVGIcon 
              icon={this.props.charData.archetype} 
              fillColor="#FFFFFF"/>
            <div className="charInfo">
              <h4>{this.props.charData.name}</h4>
              <p>Level {this.props.charData.level}</p>
            </div>
          </li>
          <li className="navRight">
            <p className="lastSaved">{this.props.lastSaved ? 'Last Saved: ' + this.props.lastSaved : null}</p>
            <button onClick={() => this.props.saveChar(this.props.charData, this.props.charID, this.props.token)}>
              {this.props.saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={this.props.logOut}>Log Out</button>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="Nav">
          <li>Home</li>
          <li>Logged Out</li>
        </ul>
      )
    }

  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    charData: state.char.charData,
    charID: state.char.id,
    saving: state.char.saving,
    lastSaved: state.char.lastSaved
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(authActions.logout()),
    saveChar: (charData, charID, token) => dispatch(charActions.saveChanges(charData, charID, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);