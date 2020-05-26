import React from 'react';
import './AddTask.css';

const addtask = (props) => {
    return (
        <div class="add-task">
            <h2 class="py-1">Add Task</h2>
            <form class="needs-validation" noValidate>
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Enter the Task" required />
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    <div class="col-md-3 mb-3">
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
                    <div class="col-md-3 mb-3">
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
                </div>
                <div class="form-row">
                    <div class="col-md-3 mb-3">
                    <input type="text" placeholder="Enter label" class="form-control" id="validationCustom05" required />
                    <div class="invalid-feedback">
                        Please provide a valid label.
                    </div>
                    </div>
                    <div class="offset-md-6 col-md-1.5 mb-3">
                        <button class="btn btn-outline-primary btn-lg" type="submit" id="add-btn">Add</button>
                    </div>
                    <div class="col-md-1.5 mb-3">
                        <button class="btn btn-outline-danger btn-lg" type="reset" id="reset-btn">Reset</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default addtask;