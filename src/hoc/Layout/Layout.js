import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Nav from '../../components/UI/Nav/Nav';

import './Layout.css';

class Layout extends Component {
  state = {
    sidebarOpen: false
  }

  render(){
    return(
      <Aux>
        { this.props.token ? <Nav/> : null }
        { this.state.sidebarOpen ? <div>Sidebar</div> : null }
        <main>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);