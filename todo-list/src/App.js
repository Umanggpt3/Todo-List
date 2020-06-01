import React, { Component } from 'react';
import Todo from './Components/Todo/Todo';
import Landing from './Components/Landing/Landing';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  state = {
    loggedIn: false,
    checked: false,
    authToken: ""
  }

  componentDidMount() {
    if(this.state.checked === true) {
        document.body.style.backgroundColor = "#222";
    } else {
        document.body.style.backgroundColor = "#fff";
    }
  }

  componentDidUpdate() {
    if(this.state.checked === true) {
        document.body.style.backgroundColor = "#222";
    } else {
        document.body.style.backgroundColor = "#fff";
    }
  }


  toggleEnabled = () => {
    this.setState({
      checked: !this.state.checked
    });
  }

  changeLogin = (data) => {
    this.setState({
      loggedIn: data === null ? false : true,
      authToken: data["auth_token"]
    });
  }

  render() {
    
    const dark = {
      background: "#222",
      color: "white"
    }

    const light = {
      color: "#555",
      background: "white"
    }

    const toggle = {
      position: "absolute",
      top: "100",
      right: "0",
      padding: "20px",
      color: "white"
    };

    return (
      <div className={this.state.loggedIn === true ? "" : "app"} style={this.state.checked === true ? dark : light}>
        {this.state.loggedIn === true ?
        <Todo 
          isDark={this.state.checked}
          authToken={this.state.authToken}
          changeLogin={this.changeLogin}
        /> :
        <Landing 
          loggedIn={this.state.loggedIn}
          changeLogin={this.changeLogin}
          isDark={this.state.checked}
          authToken={this.state.authToken}
        />}
        <Form style={toggle}>
          <Form.Check 
            type="switch"
            id="custom-switch"
            checked={this.state.checked}
            onChange={this.toggleEnabled}
            label={this.state.checked === true ? "Dark" : "Light"}
          />
        </Form>
      </div>
    )
  }
}

export default App;
