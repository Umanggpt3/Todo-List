import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            user: {
                username: "",
                password: ""
            }
        }
    }

    setValidated = (val) => {
        this.setState({
            validated: val
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setValidated(true);
        } else {
            if(this.state.user.username === "abc" && this.state.user.password === "123" && this.props.loggedIn !== true) {
                this.props.aFunctionCall();
            }
            this.setValidated(false);
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        let newuser = this.state.user;
        let value = target.value;
        const name = target.name;
    
        newuser[name] = value;
        this.setState({
            user: newuser
        });
    }

    render() {
        return (
            <Form 
                className="loginForm" 
                noValidate
                validated={this.state.validated}
                onSubmit={this.handleSubmit} >
                <h3>Sign In</h3>
                <Form.Row>
                    <Form.Group as={Col} md={12} controlId="validationUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="username"
                        value={this.state.user.username}
                        onChange={this.handleInputChange}
                        placeholder="Enter username"
                    />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md={12} controlId="validationLastName">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.handleInputChange}
                        placeholder="Enter password"
                    />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check
                    label="Remember me"
                    />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md={12}>
                        <Button type="submit" variant="primary btn-block">Sign In</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        )
    }
}

export default Login;