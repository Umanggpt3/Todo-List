import React, { Component } from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import Navbar from '../Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Todo.css'

class Todo extends Component {

  state = { 
    show: false,
    todoItems: [
      {
        id: "1",
        description: "Buy ingredients to prepare dinner",
        status: 'Completed',
        label: 'Shopping',
        date: '2020-02-15',
        time: '12:30'
      },
      {
        id: "2",
        description: "Read Algebra and History textbook for upcoming test",
        status: 'Pending',
        label: 'Study',
        date: '2020-02-15',
        time: '12:30'
      },
      {
        id: "3",
        description: "Go to library to rent sally's books",
        status: 'New',
        label: 'Personal',
        date: '2020-02-15',
        time: '12:30'
      },
      {
        id: "4",
        description: "Write article on how to use django with react",
        status: 'Pending',
        label: 'Work',
        date: '2020-02-15',
        time: '12:30'
      }
    ]
  };

  toggleAddTask = () => {
    this.setState({ show: !this.state.show })
    console.log(this.state.show);
  }

  addNewTask = (newitem) => {
    let newitems = [
      ...this.state.todoItems
    ];

    newitem.id = this.state.todoItems.length.toString();

    newitems.push(newitem);

    this.setState({
      show: this.state.show,
      todoItems: newitems
    });

    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Navbar 
          toggleModal={this.toggleAddTask}/>
        <AddTask 
          show={this.state.show}
          onHide={this.toggleAddTask}
          submit={this.handleSubmit}
          addNewTask={this.addNewTask}/>
        <div className="todo-table">
        <table class="table table-borderless table-responsive">
          <thead class="thead-light">
            <tr>
              <th scope="col"></th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Label</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
          {this.state.todoItems.map(item => {
            return <Task
              key={item.id}
              desc={item.description}
              status={item.status}
              label={item.label}
              date={item.date}
              time={item.time}
            />
          })}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export default Todo;