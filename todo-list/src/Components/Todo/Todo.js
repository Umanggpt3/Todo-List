import React, { Component } from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import Navbar from '../Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Todo.css'

let todoItems = [
  {
    id: "1",
    description: "Buy ingredients to prepare dinner",
    status: 'Completed',
    label: 'Shopping',
    date: Date(Date.now()).toString()
  },
  {
    id: "2",
    description: "Read Algebra and History textbook for upcoming test",
    status: 'Pending',
    label: 'Study',
    date: Date(Date.now()).toString()
  },
  {
    id: "3",
    description: "Go to library to rent sally's books",
    status: 'New',
    label: 'Personal',
    date: Date(Date.now()).toString()
  },
  {
    id: "4",
    description: "Write article on how to use django with react",
    status: 'Pending',
    label: 'Work',
    date: Date(Date.now()).toString()
  }
];

class Todo extends Component {

  state = { show: false };
  
  toggleAddTask = () => {
    this.setState({ show: !this.state.show })
    console.log(this.state.show);
  }

  render() {
    return (
      <div>
        <Navbar 
          toggleModal={this.toggleAddTask}/>
        <AddTask 
          show={this.state.show}
          onHide={this.toggleAddTask}/>
        <table class="table table-borderless table-responsive todo-table">
          <thead class="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Label</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
          {todoItems.map(item => {
            return <Task
              id={item.id}
              desc={item.description}
              status={item.status}
              label={item.label}
              date={item.date}
            />
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Todo;