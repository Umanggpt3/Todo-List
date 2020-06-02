import React, { Component } from 'react';
import Todo from './Components/Todo/Todo';
import Landing from './Components/Landing/Landing';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  state = {
    loggedIn: false,
    checked: true,
    authToken: localStorage.getItem('AuthToken') || "",
    darkMode: localStorage.getItem('DarkMode') || ""
  }

  UNSAFE_componentWillMount() {
    if(this.state.authToken !== "") {
      this.setState({
        loggedIn: !this.state.loggedIn
      });
    }

    if(this.state.darkMode === "Dark") {
      this.setState({
        checked: true
      });
    } else {
      this.setState({
        checked: false
      });
    }
  }

  componentDidMount() {
    if(this.state.checked === true) {
        document.body.style.backgroundColor = "#222";
    } else {
        document.body.style.backgroundColor = "#fff";
    }
    let htmlTags = document.getElementsByTagName("html");
    for(var i=0; i < htmlTags.length; i++) {
      htmlTags[i].style.background = this.state.checked === true ? "#111" : "#007bff";
    }
  }

  componentDidUpdate() {
    if(this.state.checked === true) {
        document.body.style.backgroundColor = "#222";
    } else {
        document.body.style.backgroundColor = "#fff";
    }
    let htmlTags = document.getElementsByTagName("html");
    for(var i=0; i < htmlTags.length; i++) {
      htmlTags[i].style.background = this.state.checked === true ? "#111" : "#007bff";
    }
  }


  toggleEnabled = (event) => {
    this.setState({
      checked: event.target.checked
    }, () => {
      if(this.state.checked === true) {
        localStorage.setItem("DarkMode", "Dark");
      } else {
        localStorage.setItem("DarkMode", "Light");
      }
    });
  }

  changeLogin = (data) => {
    this.setState({
      loggedIn: data === null ? false : true,
      authToken: data === null ? "" : data["auth_token"]
    }, () => {
      if(data === null) {
        localStorage.removeItem("AuthToken");
      } else {
        localStorage.setItem("AuthToken", this.state.authToken);
      }
    });
  }

  render() {
    
    const dark = {
      background: "#111",
      color: "white"
    }

    const light = {
      color: "#fff",
      background: "#007bff"
    }

    const darktoggle = {
      position: "absolute",
      top: "100",
      right: "0",
      padding: "20px",
      color: "white"
    };

    const lighttoggle = {
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
        <Form style={this.state.checked === true ? darktoggle : lighttoggle}>
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
