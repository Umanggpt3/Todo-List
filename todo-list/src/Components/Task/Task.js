import React from 'react';
import Form from 'react-bootstrap/Form';
import './Task.css';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkBoxChecked: false
        }
    }

    handleCheckBox = (event) => {
        this.setState(
            {
                checkBoxChecked: event.target.checked
            }
        );
    }

    render() {
        return (
            <tr>
                <th className={!this.state.checkBoxChecked ? "" : "strikeThrough"} scope="row">
                <Form className="mb-3">
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check 
                            type="checkbox" 
                            checked={this.state.checkBoxChecked}
                            onChange={this.handleCheckBox}
                        />
                    </Form.Group>
                </Form>
                </th>
                <td className={!this.state.checkBoxChecked ? "" : "strikeThrough"}>{this.props.desc}</td>
                <td className={!this.state.checkBoxChecked ? "" : "strikeThrough"}>{this.props.status}</td>
                <td className={!this.state.checkBoxChecked ? "" : "strikeThrough"}>{this.props.label}</td>
                <td className={!this.state.checkBoxChecked ? "" : "strikeThrough"}>{this.props.date}</td>
                <td className={!this.state.checkBoxChecked ? "" : "strikeThrough"}>{this.props.time}</td>
            </tr>
        )
    }
}

export default Task;