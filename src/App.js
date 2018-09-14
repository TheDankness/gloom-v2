import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import * as actions from './store/actions/auth';
import * as charActions from './store/actions/character';
import Layout from './hoc/Layout/Layout';
import Character from './containers/CharacterSheet/Character';
import Auth from './containers/Auth/Auth';
import NewCharacter from './components/Intro/NewCharacter/NewCharacter';

class App extends Component {

  componentDidMount() {
    this.props.isLoggedIn();
  }

  render() {
    let routes;

    if(this.props.authStatus){
      routes = (
        <Switch>
          <Route path="/character" exact component={Character} />
          <Route path="/new-character" exact component={NewCharacter} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact render={() => { return <Redirect to="/character"/> }}/>
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/" component={Auth} />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isLoggedIn: () => dispatch(actions.isLoggedIn()),
    fetchCharacter: (userID, token) => dispatch(charActions.fetchCharacter(userID, token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
