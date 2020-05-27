import React from 'react';
import Form from 'react-bootstrap/Form';
import './Task.css';

const task = (props) => {
    return (
        <tr>
            <th scope="row">
            <Form className="mb-3">
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" />
                </Form.Group>
            </Form>
            </th>
            <td>{props.desc}</td>
            <td>{props.status}</td>
            <td>{props.label}</td>
            <td>{props.date}</td>
            <td>{props.time}</td>
        </tr>
    )
};

export default task;