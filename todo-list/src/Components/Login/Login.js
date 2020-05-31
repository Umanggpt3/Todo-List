import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form className="loginForm" noValidate >
                <h3>Sign In</h3>
                <Form.Row>
                    <Form.Group as={Col} md={12} controlId="validationUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="uname"
                        placeholder="Enter username"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md={12} controlId="validationLastName">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="pass"
                        placeholder="Enter password"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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