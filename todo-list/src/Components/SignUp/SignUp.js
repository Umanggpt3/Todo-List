import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './SignUp.css';

class SignUp extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const dark = {
            background: "#333",
            color: "white"
        }

        const light = {
            color: "#555",
            background: "rgba(0,0,0,0.05)"
        }

        return (
            <Form 
                className="signUpForm" 
                noValidate style={{width: "95%"}}
                style={this.props.isDark === true ? dark : light}>
                <h3>Sign Up</h3>
                <Form.Row>
                    <Form.Group as={Col} md={6} controlId="validationfName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="fname"
                        placeholder="Enter first name"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="validationlName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="lname"
                        placeholder="Enter last name"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md={6} controlId="validationUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="uname"
                        placeholder="Enter username"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="validationEmailName">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md={6} controlId="validationPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="pass"
                        placeholder="Enter password"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="validationConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="cpass"
                        placeholder="Enter password again"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check
                    label="I agree to the terms and conditions."
                    />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md={12}>
                        <Button type="submit" variant="primary btn-block">Sign Up</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        )
    }
}

export default SignUp;