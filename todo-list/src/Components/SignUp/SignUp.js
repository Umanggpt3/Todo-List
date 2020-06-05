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
            checked: false,
            user: {
                fname: "",
                lname: "",
                username: "",
                email: "",
                password: "",
                cnfpassword: ""
            },
            password: {
                isValid: false,
                isInvalid: false
            },
            email: {
                isValid: false,
                isInvalid: false
            }
        }
    }

    setValidated = (val) => {
        this.setState({
            validated: val
        })
    }

    setCheckBox = (event) => {
        this.setState({
            checked: event.target.checked
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setValidated(true);
        } else {
            if(this.props.loggedIn !== true && this.state.password.isValid === true && this.state.email.isValid === true && this.state.checked === true) {
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
                .then(response => {
                    if (response.status === 200) {
                        alert("Registered Successfully, Login with your username and password.");
                        this.props.changeToLogin();
                    } else if(response.status === 400) {
                        alert("Username already taken");
                    }
                });

                this.setValidated(false);
            }
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        let newuser = this.state.user;
        let value = target.value;
        const name = target.name;
    
        if(name === "cnfpassword") {
            if(newuser.password === value) {
                this.setState({
                    password: {
                        isValid: true,
                        isInvalid: false
                    }
                });
            } else {
                this.setState({
                    password: {
                        isValid: false,
                        isInvalid: true
                    }
                });
            }

            if(value === "") {
                this.setState({
                    password: {
                        isValid: false,
                        isInvalid: false
                    }
                })
            }
        }

        if(name === "password") {
            if(newuser.cnfpassword === value) {
                this.setState({
                    password: {
                        isValid: true,
                        isInvalid: false
                    }
                });
            } else {
                this.setState({
                    password: {
                        isValid: false,
                        isInvalid: true
                    }
                });
            }

            if(value === "") {
                this.setState({
                    password: {
                        isValid: false,
                        isInvalid: false
                    }
                })
            }
        }

        if(name === "email") {
            if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                this.setState({
                    email: {
                        isValid: true,
                        isInvalid: false
                    }
                });
            } else {
                this.setState({
                    email: {
                        isValid: false,
                        isInvalid: true
                    }
                });
            }

            if(value === "") {
                this.setState({
                    email: {
                        isValid: false,
                        isInvalid: false
                    }
                })
            }
        }

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
            background: "#fff",
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
                    <Form.Control.Feedback type="invalid">First name required!</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">Last name required!</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">Enter proper username!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="validationEmailName">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        name="email"
                        value={this.state.user.email}
                        onChange={this.handleInputChange}
                        isValid={this.state.email.isValid}
                        isInvalid={this.state.email.isInvalid}
                        placeholder="Enter email"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Enter proper e-mail!</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">Password required!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="validationConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="cnfpassword"
                        value={this.state.user.cnfpassword}
                        onChange={this.handleInputChange}
                        isValid={this.state.password.isValid}
                        isInvalid={this.state.password.isInvalid}
                        placeholder="Enter password again"
                        style={this.props.isDark === true ? dark : null}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Passwords don't match!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check
                    checked={this.state.checked}
                    onChange={this.setCheckBox}
                    isValid={this.state.checked}
                    label="I agree to the terms and conditions."
                    />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md={12}>
                        <Button type="submit" variant="primary btn-block">Sign Up</Button>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <div className="or mx-auto">
                        <p><span>OR</span></p>
                    </div>
                </Form.Row>
                <Form.Row>
                    <p className="mx-auto">
                        Already a member?
                        <Button className="ml-3" variant="primary btn-sm" onClick={this.props.changeToLogin}>Sign In</Button>
                    </p>
                </Form.Row>
            </Form>
        )
    }
}

export default SignUp;