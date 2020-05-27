import React, { Component } from 'react';
import './AddTask.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const addtask = (props) => {

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2 class="py-1" style={{fontWeight: 600}}>Add Task</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form class="needs-validation" noValidate>
                    <div class="form-row">
                        <div class="col-md-12 mb-3">
                        <input type="text" class="form-control" id="validationCustom01" placeholder="Enter the Task" required />
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div class="col-md-4 mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">Date</span>
                            </div>
                            <input type="date" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                            <div class="invalid-feedback">
                                Please choose a deadline.
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4 mb-3">
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">Time</span>
                            </div>
                            <input type="time" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                            <div class="invalid-feedback">
                                Please choose a reminder time.
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4 mb-3">
                        <input type="text" placeholder="Enter label" class="form-control" id="validationCustom05" required />
                        <div class="invalid-feedback">
                            Please provide a valid label.
                        </div>
                        </div>  
                    </div>
                    <div class="form-row">
                        <div class="offset-md-3 col-md-2 mb-3">
                            <button class="btn btn-outline-primary btn-lg" type="submit" id="add-btn">Add</button>
                        </div>
                        <div class="offset-md-2 col-md-2 mb-3">
                            <button class="btn btn-outline-danger btn-lg" type="reset" id="reset-btn">Reset</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            </Modal>
        </>
    )
}

export default addtask;