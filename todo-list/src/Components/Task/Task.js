import React from 'react';
import Form from 'react-bootstrap/Form';
import './Task.css';

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
            checkBoxDisabled: false
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
            let nowTime = nowDate.getHours() + ":" + nowDate.getMinutes();
            this.props.completedTask(this.props.desc, nowDate.yyyymmdd(), nowTime);
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
                (daysDiff < 0) ? <div className="btn btn-dark btn-block btn-sm" >Overdue</div> :
                (daysDiff <= 2) ? <div className="btn btn-danger btn-block btn-sm" >{val}</div>
                : <div className="btn btn-warning btn-block btn-sm" >{val}</div>

            )
        } else if (val === "Completed") {
            return (
                <div className="btn btn-success btn-block btn-sm" >{val}</div>
            )
        }
    }

    render() {
        return (
            <tr>
                <th className={this.props.comp === 'Archive' ? "strikeThrough" : (!this.state.checkBoxChecked ? "" : "strikeThrough")} scope="row">
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
                </th>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                        {this.props.desc}
                </td>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                        {this.prettyStatus()}
                </td>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                        {this.props.label}
                </td>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                        {this.props.date}
                </td>
                <td 
                    className={this.props.comp === 'Archive' ? 
                    "strikeThrough" : 
                    !this.state.checkBoxChecked ? 
                    "" : 
                    "strikeThrough"}>
                        {this.props.time}
                </td>
            </tr>
        )
    }
}

export default Task;