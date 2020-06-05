import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

class EditTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            item: {
                id: this.props.editTask.id,
                description: this.props.editTask.description,
                status: this.props.editTask.status,
                label: this.props.editTask.label,
                date: this.props.editTask.date,
                time: this.props.editTask.time.slice(0,5)
            }
        }
    }

    setValidated = (val) => {
        this.setState({
            validated: val
        })
    }

    editTask = () => {
        let updateItem = {
            "id": this.state.item.id,
            "description": this.state.item.description,
            "status": this.state.item.status,
            "label": this.state.item.label,
            "date": this.state.item.date,
            "time": this.state.item.time
        }

        let token = ("Token " + this.props.authToken).toString();
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify(updateItem) 
        };

        fetch('http://127.0.0.1:8000/item/update', requestOptions)
        .then(response => {
            if(response.status === 200){
                this.props.updateData();
                this.props.onHide();
                this.handleReset();
                alert("Task Edited.");
            } else {
                alert("There was some problem with that. We're currently working on fixing it. Thank You.");
            }
        });
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            this.setValidated(true);
        } else {
            console.log(this.state.item);
            let nowDate = Date.now();
            let dueDate = new Date(this.state.item.date + " " + this.state.item.time);
            let daysDiff = (dueDate.getTime() - nowDate) / (1000 * 3600 * 24);
            let val = "Ongoing";
            
            if(daysDiff < 0) {
                val = "Overdue";
            } else if (daysDiff <=2) {
                val = "Pending";
            }

            let newItem = this.state.item;
            newItem.status = val;
            this.setState({
                item: newItem
            }, this.editTask());

            this.setValidated(false);
        }
    }

    handleReset = (event) => {
        let newitem = {
            id: "",
            description: "",
            status: "",
            label: "",
            date: "",
            time: ""
        };

        this.setState({
            item: newitem
        });

        this.setValidated(false);
    }

    handleInputChange = (event) => {
        const target = event.target;

        let newitem = this.state.item;
        let value;
        if(target.name === "description") {
            value = target.value;
        } else if(target.name === "date") {
            value = target.value;
        } else if(target.name === "time") {
            value = target.value;
            console.log(value);
        } else if(target.name === "label") {
            value = target.value;
        }

        const name = target.name;
    
        newitem[name] = value;
    
        this.setState({
            item: newitem
        });
    }

    render() {

        const dark = {
            background: "#333",
            color: "white"
        }
    
        const light = {
            color: "#555",
            background: "white"
        }

        return (
            <div style={this.props.isDark === true ? dark : light}>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                <Modal.Header style={this.props.isDark === true ? dark : light} closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2 className="py-1" style={{fontWeight: 600}}>
                            Edit Task
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={this.props.isDark === true ? dark : light}>
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
                                placeholder="Enter the Task"
                                value={this.state.item.description} 
                                onChange={this.handleInputChange}
                                style={this.props.isDark === true ? dark : null}
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
                                    style={this.props.isDark === true ? dark : null}
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
                                    style={this.props.isDark === true ? dark : null}
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
                                style={this.props.isDark === true ? dark : null}
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
                                <button className="btn btn-primary btn-lg" type="submit" id="add-btn">Edit</button>
                            </Form.Group>
                            <Form.Group className="offset-md-2 col-md-2 mb-3">
                                <button className="btn btn-danger btn-lg" type="reset" id="reset-btn">Reset</button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default EditTask;