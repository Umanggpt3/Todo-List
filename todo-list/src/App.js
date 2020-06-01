import React, { Component } from 'react';
import Todo from './Components/Todo/Todo';
import Landing from './Components/Landing/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  state = {
    loggedIn: false
  }

  componentDidMount() {
    let xhr = new XMLHttpRequest();
    let xhr1 = new XMLHttpRequest();
    let userInfo = JSON.stringify({
      "username":"CaptainClaw",
      "password":"password"
    });

    xhr.addEventListener('load', () => {
      console.log(xhr.responseText)
    });

    xhr1.addEventListener('load', () => {
      console.log(xhr1.responseText)
    });
    
    xhr.open('POST', 'http://127.0.0.1:8000/user/login/');
    xhr1.open('POST', 'http://127.0.0.1:8000/item/get_all');

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr1.setRequestHeader("Authorization","Token 1b825501c7578d19c45d89704e733607fe4e200d");

    xhr.send(userInfo);
    xhr1.send();
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
