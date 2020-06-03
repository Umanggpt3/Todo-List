import React from 'react';
import Form from 'react-bootstrap/Form';
import EditTask from '../EditTask/EditTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt , faEdit } from '@fortawesome/free-solid-svg-icons';
import './Task.css';

/*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/

Date.prototype.yyyymmdd = function() {
    let mm = this.getMonth() + 1;
    let dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
};

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkBoxChecked: false,
            checkBoxDisabled: false,
            showEdit: false,
            editItem: {
                id: this.props.id,
                description: this.props.desc,
                status: this.props.status,
                label: this.props.label,
                date: this.props.date,
                time: this.props.time
            }
        }
    }

    componentDidMount() {
        if (this.props.comp === 'Archive' )
            this.setState({ 
                checkBoxChecked: true,
                checkBoxDisabled: true
            });
    }

    handleCheckBox = (event) => {
        this.setState({
            checkBoxChecked: event.target.checked
        });
        if(event.target.checked) {
            let nowDate = new Date();
            let nowTime = (nowDate.getHours() + ":" + nowDate.getMinutes()).toString();
            this.props.completedTask(this.props.id, nowDate.yyyymmdd().toString(), nowTime);
        }
    }

    prettyStatus = () => {
        let nowDate = Date.now();
        let dueDate = new Date(this.props.date + " " + this.props.time);
        let val = this.props.status;
        let daysDiff = (dueDate.getTime() - nowDate) / (1000 * 3600 * 24);

        if (val === 'Ongoing') {
            return (
                <div className="btn btn-primary btn-block btn-sm" >{val}</div>
            )
        } else if (val === "Pending") {
            return (
                (daysDiff <= 1) ? <div className="btn btn-danger btn-block btn-sm" >{val}</div>
                : <div className="btn btn-warning btn-block btn-sm" >{val}</div>

            )
        } else if (val === "Completed") {
            return (
                <div className="btn btn-success btn-block btn-sm" >{val}</div>
            )
        } else if (val === "Overdue") {
            return (
                <div className="btn btn-secondary btn-block btn-sm" >{val}</div>
            )
        }
    }

    removeItem = () => {
        this.props.removeItem(this.props.id);
    }

    toggleEditTask = () => {
        this.setState({
            showEdit: !this.state.showEdit
        });
    }

    updateData = () => {
        this.props.updateData();
    }

    render() {
        return (
            <>
            <tr className="active">
                <th className={this.props.comp === 'Archive' ? "strikeThrough" : (!this.state.checkBoxChecked ? "" : "strikeThrough")} scope="row">
                <div>
                <Form className="mb-3">
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            disabled={this.state.checkBoxDisabled}
                            type="checkbox"
                            checked={this.state.checkBoxChecked}
                            onChange={this.handleCheckBox}
                        />
                    </Form.Group>
                </Form>
                </div>
                </th>
                {
                    this.props.comp !== 'Archive' ? 
                    <td>
                        <FontAwesomeIcon icon={faEdit} onClick={() => this.toggleEditTask()}></FontAwesomeIcon>
                        <EditTask 
                            show={this.state.showEdit}
                            onHide={this.toggleEditTask}
                            isDark={this.props.isDark}
                            authToken={this.props.authToken}
                            editTask={this.state.editItem}
                            updateData={this.updateData}/>
                    </td> :
                    null
                }
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"} >
                    <div>{this.props.desc}</div>    
                </td>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                    <div>{this.prettyStatus()}</div>    
                </td>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                    <div>{this.props.label}</div>    
                </td>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                    <div>{this.props.date}</div>    
                </td>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                    <div>{this.props.time}</div>    
                </td>
                <td>
                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => this.removeItem()}></FontAwesomeIcon>
                </td>
            </tr>
            </>
        )
    }
}

export default Task;