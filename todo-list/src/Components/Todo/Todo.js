import React, { Component } from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort , faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
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
        date: '2020-02-14',
        time: '12:30'
      },
      {
        id: "3",
        description: "Go to library to rent sally's books",
        status: 'New',
        label: 'Personal',
        date: '2020-03-15',
        time: '12:30'
      },
      {
        id: "4",
        description: "Write article on how to use django with react",
        status: 'Pending',
        label: 'Work',
        date: '2019-02-15',
        time: '12:30'
      }
    ],
    sortType: {
      status: '',
      label: '',
      date: 'desc',
      time: ''
    },
    currentSort: "date"
  };

  toggleAddTask = () => {
    this.setState({ show: !this.state.show })
    console.log(this.state.show);
  }

  addNewTask = (newitem) => {
    let newitems = [
      ...this.state.todoItems
    ];

    newitem.id = (this.state.todoItems.length + 1).toString();

    newitems.push(newitem);

    this.setState({
      show: this.state.show,
      todoItems: newitems
    });
  }

  getSortIcon = (val) => {
    if (this.state.currentSort === val) {
      if (this.state.sortType[val] === 'asc') {
        return (<FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon>);
      } else if (this.state.sortType[val] === 'desc') {
        return (<FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>);
      } else {
        return (<FontAwesomeIcon icon={faSort}></FontAwesomeIcon>);
      }
    } else {
      return (<FontAwesomeIcon icon={faSort}></FontAwesomeIcon>);
    }
  }

  compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
      const comparison = a[key].localeCompare(b[key]);
  
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  sortTasks = (val) => {
    let newTodo =  [
      ...this.state.todoItems
    ];

    let newSortType = this.state.sortType;

    let order;
    
    if (this.state.sortType[val] === 'asc') {
      order = 'desc'
    } else {
      order = 'asc';
    }

    newTodo.sort(this.compareValues(val, order));
    
    newSortType[val] = order;
  
    this.setState({
      todoItems: newTodo,
      sortType: newSortType,
      currentSort: val
    });
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
          addnewtask={this.addNewTask}/>
        <div className={this.state.todoItems.length !== 0 ? "todo-table mr-bottom" : "todo-table"}>
            {this.state.todoItems.length !== 0 ?
              <table className="table table-borderless table-responsive">
              <thead className="thead-light">
                <tr className="head">
                  <th scope="col"></th>
                  <th scope="col">Title</th>
                  <th onClick={() => this.sortTasks("status")} scope="col">
                    Status
                    <div className="sort-icon">
                      {this.getSortIcon("status")}
                    </div>
                  </th>
                  <th onClick={() => this.sortTasks("label")} scope="col">
                    Label
                    <div className="sort-icon">
                      {this.getSortIcon("label")}
                    </div>
                  </th>
                  <th onClick={() => this.sortTasks("date")} scope="col">
                    Date
                    <div className="sort-icon">
                      {this.getSortIcon("date")}
                    </div>
                  </th>
                  <th onClick={() => this.sortTasks("time")} scope="col">
                    Time
                    <div className="sort-icon">
                      {this.getSortIcon("time")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.state.todoItems.map(item => {
                return (
                    <Task
                    key={item.id}
                    desc={item.description}
                    status={item.status}
                    label={item.label}
                    date={item.date}
                    time={item.time}
                  />
                )
              })}
              </tbody>
              </table> :
                <h6 className="text-center">Click on add tasks to see your tasks here.</h6>
              }
        </div>
      </div>
    )
  }
}

export default Todo;