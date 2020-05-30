import React from 'react';
import './AddTask.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

class Addtask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            item: {
                id: "",
                description: "",
                status: "Ongoing",
                label: "",
                date: "",
                time: ""
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
            this.props.addnewtask(this.state.item);
            let newitem = {
                id: "",
                description: "",
                status: "Ongoing",
                label: "",
                date: "",
                time: ""
            }
    
            this.setState({
                item: newitem
            });

            this.setValidated(false);
        }
    }

    handleReset = (event) => {
        let newitem = {
            id: "",
            description: "",
            status: "New",
            label: "",
            date: "",
            time: ""
        }

        this.setState({
            item: newitem
        })

        this.setValidated(false);
    }

    handleInputChange = (event) => {
        const target = event.target;
        let value;
        if(target.name === "description") {
            value = target.value;
        } else if(target.name === "date") {
            value = target.value;
        } else if(target.name === "time") {
            value = target.value;
        } else if(target.name === "label") {
            value = target.value;
        }

        const name = target.name;
    
        this.state.item[name] = value;
    
        this.setState({
            item: this.state.item
        })
    }

    render() {

        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2 className="py-1" style={{fontWeight: 600}}>Add Task</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                        noValidate 
                        validated={this.state.validated} 
                        onSubmit={this.handleSubmit} 
                        onReset={this.handleReset}
                    >
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationTitle">
                            <Form.Control
                                required
                                type="text"
                                name="description"
                                placeholder="Enter The Task"
                                value={this.state.item.description} 
                                onChange={this.handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the task details.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>
                                Looks good.
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationDate">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">Date</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    aria-describedby="inputGroupPrepend"
                                    value={this.state.item.date}
                                    onChange={this.handleInputChange}
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
                            <Form.Group as={Col} md="4" controlId="validationTime">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">Time</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="time"
                                    name="time"
                                    aria-describedby="inputGroupPrepend"
                                    value={this.state.item.time}
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a proper reminder time.
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>
                                    Looks good.
                                </Form.Control.Feedback>
                            </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationLabel">
                            <Form.Control 
                                type="text"
                                name="label"
                                placeholder="Enter Label" 
                                value={this.state.item.label}
                                onChange={this.handleInputChange}
                                required 
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter label.
                            </Form.Control.Feedback>
                            <Form.Control.Feedback>
                                Looks good.
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group className="offset-md-3 col-md-2 mb-3">
                                <button className="btn btn-outline-primary btn-lg" type="submit" id="add-btn">Add</button>
                            </Form.Group>
                            <Form.Group className="offset-md-2 col-md-2 mb-3">
                                <button className="btn btn-outline-danger btn-lg" type="reset" id="reset-btn">Reset</button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Addtask;