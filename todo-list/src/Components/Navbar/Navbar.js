import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch , faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

class NavbarAbove extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fromDate: "",
            toDate: "",
            validated: false
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

        let fDate = new Date(this.state.fromDate + " 00:00:00");
        let tDate = new Date(this.state.toDate + " 00:00:00");
        
        let daysDiff = (tDate.getTime() - fDate.getTime()) / (1000 * 3600 * 24);
        
        if (form.checkValidity() === false || (daysDiff < 0 && daysDiff !== "NaN")) {
            
            event.stopPropagation();
            
            if(daysDiff < 0) {
                this.setValidated(false);
                alert("Select The Dates Properly.");
            } else {
                this.setValidated(true);
            }

        } else {
            this.props.searchFunction(this.state.fromDate, this.state.toDate);
            this.setValidated(false);
        }
    }

    handleReset = (event) => {
        this.setState({
            fromDate: "",
            toDate: ""
        });

        this.setValidated(false);
        this.props.searchFunction(this.state.fromDate, this.state.toDate, 0);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value;
        if(name === "fromDate") {
            value = target.value;
            this.setState({
                fromDate: value
            });
        } else if(name === "toDate") {
            value = target.value;
            this.setState({
                toDate: value
            });
        }
    }

    logoutCall = () => {
        let token = ("Token " + this.props.authToken).toString();
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token,
            }
        };

        fetch('http://127.0.0.1:8000/user/logout/', requestOptions)
        .then(response => {
            if (response.status === 200) {
                this.props.aFunctionCall(null);
            } else {
                alert("Sorry for the inconvenience. We're working to solve this issue.")
            }
        });
    }

    toggleModal = () => {
        this.props.toggleModal();
    }

    render() {

        const bgDark = {
            background: "#111",
            color: "white"
        }

        const dark = {
            background: "#333",
            color: "white"
        }
    
        const bgLight = {
            background: "#007bff",
            color: "#555"
        }

        const navButtonDark = {
            color: "white",
            background: "#555",
            marginTop: "-8px",
            marginBottom: "-8px",
            paddingTop: "8px",
            paddingBottom: "8px",
        };

        const navButtonLight = {
            color: "#555",
            background: "white",
            marginTop: "-8px",
            marginBottom: "-8px",
            paddingTop: "8px",
            paddingBottom: "8px",
        };

        const abs = {
            top: "1vh",
            right: "1vw"
        }
        
        return (
            <div style={this.props.isDark === true ? bgDark : bgLight}>
                <Navbar collapseOnSelect expand="xs" style={this.props.isDark === true ? bgDark : bgLight} variant="dark" fixed="top" className="fixedTop-1">
                    <Navbar.Brand href="#home">Todo List</Navbar.Brand>
                    <Nav className="justify-content-end ml-auto">
                        <NavDropdown style={abs} className="position-absolute" title={"Welcome " + this.props.uname} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.logoutCall} style={this.props.isDark === true ? navButtonDark : navButtonLight}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Navbar collapseOnSelect bg={this.props.isDark === true ? "dark" : "light"} variant="dark" className="fixedTop-2 mx-auto">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="nav-2 mx-auto">
                            <Form
                                noValidate 
                                validated={this.state.validated} 
                                onSubmit={this.handleSubmit} 
                                onReset={this.handleReset}
                                className="row"
                            >
                                <Form.Group as={Col} lg="2" controlId="validationDate">
                                    <Button className="addtask-btn btn-block" variant="warning" onClick={() => this.toggleModal()}>+ Add Task</Button>
                                </Form.Group>
                                <Form.Group as={Col} lg="4" controlId="validationFromDate">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend1">From</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="date"
                                        name="fromDate"
                                        value={this.state.fromDate}
                                        onChange={this.handleInputChange}
                                        aria-describedby="inputGroupPrepend1"
                                        style={this.props.isDark === true ? dark : null}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a proper date.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks good.
                                    </Form.Control.Feedback>
                                </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} lg="4" controlId="validationToDate">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend2">To</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="date"
                                        name="toDate"
                                        value={this.state.toDate}
                                        onChange={this.handleInputChange}
                                        aria-describedby="inputGroupPrepend2"
                                        style={this.props.isDark === true ? dark : null}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a proper date.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>
                                        Looks good.
                                    </Form.Control.Feedback>
                                </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} lg="1" controlId="validationDate">
                                    <Button className="search-btn btn-block" variant="primary" type="submit">
                                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                    </Button>
                                </Form.Group>
                                <Form.Group as={Col} lg="1" controlId="validationDate">
                                    <Button className="search-btn btn-block" variant="danger" type="reset">
                                        <FontAwesomeIcon icon={faRedoAlt}></FontAwesomeIcon>
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavbarAbove;