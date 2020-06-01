import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './SignUp.css';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            user: {
                fname: "",
                lname: "",
                username: "",
                email: "",
                password: "",
                cnfpassword: ""
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
            if(this.props.loggedIn !== true) {
                console.log(this.state.user);
                let signUpData = {
                    "username": this.state.user.username,
                    "password": this.state.user.password,
                    "email": this.state.user.email,
                    "first_name": this.state.user.fname,
                    "last_name": this.state.user.lname
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signUpData)
                };
                fetch('http://127.0.0.1:8000/user/signup/', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });
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

        const dark = {
            background: "#333",
            color: "white",
            width: "95%"
        }

        const light = {
            color: "#555",
            background: "rgba(0,0,0,0.05)",
            width: "95%"
        }

        return (
            <Form 
                className="signUpForm" 
                noValidate 
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
                style={this.props.isDark === true ? dark : light}>
                <h3>Sign Up</h3>
                <Form.Row>
                    <Form.Group as={Col} md={6} controlId="validationfName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="fname"
                        value={this.state.user.fname}
                        onChange={this.handleInputChange}
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
                        value={this.state.user.lname}
                        onChange={this.handleInputChange}
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
                        name="username"
                        value={this.state.user.username}
                        onChange={this.handleInputChange}
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
                        value={this.state.user.email}
                        onChange={this.handleInputChange}
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
                        name="password"
                        value={this.state.user.password}
                        onChange={this.handleInputChange}
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
                        name="cnfpassword"
                        value={this.state.user.cnfpassword}
                        onChange={this.handleInputChange}
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