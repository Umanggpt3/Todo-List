import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const navbar = (props) => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
                <Navbar.Brand href="#home">Todo List</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Button variant="outline-primary" onClick={props.toggleModal}>+ Add Task</Button>
                        <Navbar.Text className="px-3">Welcome Umang</Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default navbar;