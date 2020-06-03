import React from 'react';
import './Archive.css';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown , faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Task from '../Task/Task';

function CustomToggle1({ children, eventKey }) {
    return (
        <FontAwesomeIcon icon={faAngleDown} onClick={useAccordionToggle(eventKey)}></FontAwesomeIcon>
    );
}

function CustomToggle2({ children, eventKey }) {
    return (
        <FontAwesomeIcon icon={faAngleUp} onClick={useAccordionToggle(eventKey)}></FontAwesomeIcon>
    );
}

class Archive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    accordionChange = (val) => {
        this.setState({
            isOpen: val
        });
    }

    removeItem = (data) => {
        this.props.removeItem(data);
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
            <Accordion style={this.props.isDark === true ? dark : light} defaultActiveKey="">
                <Card style={this.props.isDark === true ? dark : light}>
                    <Card.Header style={this.props.isDark === true ? dark : light}>
                        <Row>
                            <h2 as={Col}>Archive</h2>
                            <div as={Col} className="ml-auto" onClick={() => this.accordionChange(!this.state.isOpen)}>
                                {this.state.isOpen === false ? 
                                <CustomToggle1 eventKey="0" /> : 
                                <CustomToggle2 eventKey="0" />}
                            </div>
                        </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className={this.props.doneItems.length !== 0 ? "mr-bottom" : ""}>
                                {this.props.doneItems.length !== 0 ?
                                <table style={this.props.isDark === true ? dark : light} className="table archive table-borderless table-responsive">
                                <thead className="thead-light">
                                    <tr className="head">
                                    <th scope="col"></th>
                                    <th scope="col">Title</th>
                                    <th scope="col">
                                        Status
                                    </th>
                                    <th scope="col">
                                        Label
                                    </th>
                                    <th scope="col">
                                        Completion Date
                                    </th>
                                    <th scope="col">
                                        Time
                                    </th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.props.doneItems.map(item => {
                                    return (
                                        <Task
                                        key={item.key}
                                        id={item.id}
                                        desc={item.description}
                                        status={item.status}
                                        label={item.label}
                                        date={item.date}
                                        time={item.time}
                                        comp={"Archive"}
                                        removeItem={this.removeItem}
                                    />
                                    )
                                })}
                                </tbody>
                                </table> :
                                    <h6 className="text-center">Complete tasks to see them here.</h6>
                                }
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}

export default Archive;