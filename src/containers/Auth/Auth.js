import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/auth';
import Box from '../../hoc/Box/Box';
import Loading from '../../components/UI/Loading/Loading';
import './Auth.css'

class Auth extends Component {
  state = {
    login: {
      email: '',
      password: '',
      repeatPassword: ''
    },
    signUp: false
  };

  onChange = e => {
    this.setState({
      ...this.state,
      login: {
        ...this.state.login,
        [e.target.name]: e.target.value
      }
    })
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.login.email && this.state.login.password){
      this.props.onAuth(this.state.login.email, this.state.login.password, this.state.signUp);
    } else {
      this.props.fail('Required Field Missing');
    }
  }

  switchAuthMode = () => {
    this.setState(prevState => {
      return { signUp: !prevState.signUp }
    })
  }

  render() {
    if (this.props.loading) {
      return <Loading loadingText="Logging in..."/>
    }
    if (this.props.success) {
      return <Redirect to='/new-character'/>
    }

    const repeatPassword = (
      <div className='inputContainer'>
        <label>Repeat Password</label>
        <input type="password" value={this.state.repeatPassword} onChange={this.onChange} name="repeatPassword"/>
      </div>
    );

    return (
      <div className="Auth">
      <Box extraClasses="noFlex login">
        <h2>{this.state.signUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={this.onSubmit}>
        <div className='formContainer'>
          <div className='inputContainer'>
            <label>Email</label>
            <input type="email" value={this.state.email} onChange={this.onChange} name="email"/>
          </div>
          <div className='inputContainer'>
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={this.onChange} name="password"/>
          </div>
          {this.state.signUp ? repeatPassword : null }
          <button onClick={this.onSubmit}>{this.state.signUp ? 'Sign up' : 'Sign in'}</button>
        </div>
        </form>
        {this.props.error ? <p className="error">Error: {this.props.error}</p> : null }
        </Box>
        <p>{this.state.signUp ? 'Returning user? ' : 'New user? '}
          <a onClick={this.switchAuthMode}>{this.state.signUp ? 'Sign in' : 'Sign up'}</a>.</p>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    success: state.auth.success,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    fail: (err) => dispatch(actions.authFail(err))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
