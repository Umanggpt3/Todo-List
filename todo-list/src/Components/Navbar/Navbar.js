import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Navbar.css';

const navbar = (props) => {
    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark" fixed="top" className="fixedTop-1">
                <Navbar.Brand href="#home">Todo List</Navbar.Brand>
                <Nav className="justify-content-end ml-auto">
                    <Navbar.Text className="px-3">Welcome Umang</Navbar.Text>
                </Nav>
            </Navbar>
            <Navbar collapseOnSelect bg="light" variant="light" className="fixedTop-2 mx-auto">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="nav-2 mx-auto">
                        <Form as={Row}>
                            <Form.Group as={Col} lg="2" controlId="validationDate">
                                <Button className="addtask-btn btn-block" variant="dark" onClick={props.toggleModal}>+ Add Task</Button>
                            </Form.Group>
                            <Form.Group as={Col} lg="4" controlId="validationDate">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">From</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a proper deadline.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Looks good.
                                </Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} lg="4" controlId="validationDate">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">To</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a proper deadline.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Looks good.
                                </Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} lg="2" controlId="validationDate">
                                <Button className="search-btn btn-block" variant="primary" type="submit">Search</Button>
                            </Form.Group>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default navbar;