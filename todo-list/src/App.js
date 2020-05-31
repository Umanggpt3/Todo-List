import React, { Component } from 'react';
import Todo from './Components/Todo/Todo';
import Landing from './Components/Landing/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  state = {
    loggedIn: false
  }

  render() {
    return (
      <div className={this.state.loggedIn === true ? "" : "App"}>
        {this.state.loggedIn === true ?
        <Todo /> :
        <Landing />}
      </div>
    )
  }
}

export default App;
