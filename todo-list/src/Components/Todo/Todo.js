import React, { Component } from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import NavbarAbove from '../Navbar/Navbar';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort , faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Archive from '../Archive/Archive';
import logo from './preview.png';
import './Todo.css'

class Todo extends Component {

  state = { 
    show: false,
    todoItems: [],
    completedTodo: [],
    originalData: [],
    sortType: {
      status: '',
      label: '',
      date: 'asc',
      time: ''
    },
    currentSort: "date"
  };

  UNSAFE_componentWillMount() {
    let todoData = [];
    let completed = [];

    let token = ("Token " + this.props.authToken).toString();
        
    const requestOptions = {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token,
        }
    };

    fetch('http://127.0.0.1:8000/item/get_all', requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let OGdata = [];

        data.forEach(item => {
          let newData = {
            id: item["id"],
            description: item["description"],
            status: item["status"],
            label: item["label"],
            date: item["due_date_time"].slice(0,10),
            time: item["due_date_time"].slice(11,19)
          };
          OGdata.push(newData);
        })
        
        this.setState({
          originalData: OGdata
        }, () => {
          this.state.originalData.forEach(item => {
            if(item.status !== 'Completed') {
              todoData.push(item);  
            } else {
              completed.push(item);
            }
          });
      
          this.setState({
              todoItems: todoData,
              completedTodo: completed
          });
        });
    });
  }

  componentDidMount() {
    this.sortTasks('date');
  }

  componentDidUpdate() {
    let htmlTags = document.getElementsByTagName("html");
    for(var i=0; i < htmlTags.length; i++) {
      htmlTags[i].style.background = this.props.isDark === true ? "#111" : "#007bff";
    }
  }

  toggleAddTask = () => {
    this.setState({ show: !this.state.show });
  }

  addNewTask = (newitem) => {
    let newitems = [
      ...this.state.todoItems
    ];

    let newOGData = [
      ...this.state.originalData
    ]

    newitem.id = (this.state.originalData.length + 1).toString();

    let nowDate = Date.now();
    let dueDate = new Date(newitem.date);

    let daysDiff = (dueDate.getTime() - nowDate) / (1000 * 3600 * 24);

    if (daysDiff <= 2) {
      newitem.status = "Pending";
    }

    newitems.push(newitem);
    newOGData.push(newitem);

    this.setState({
      show: this.state.show,
      todoItems: newitems,
      originalData: newOGData
    }, () => {
      let newSortType = this.state.sortType;

      if (newSortType[this.state.currentSort] === 'asc') {
        newSortType[this.state.currentSort] = 'desc';
      } else if (newSortType[this.state.currentSort] === 'desc') {
        newSortType[this.state.currentSort] = 'asc';
      } 

      this.setState({
        sortType: newSortType
      }, () => {
        this.sortTasks(this.state.currentSort);
      });
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

  compareValues = (key, order) => {
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
      order = 'desc';
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

  completedTask = (desc, date, time) => {
    let todoData = [];
    let completed = [
      ...this.state.completedTodo
    ];
    this.state.todoItems.forEach(item => {
      if(desc.localeCompare(item.description) !== 0) {
        todoData.push(item);
      } else {
        item.status = "Completed";
        item.date = date;
        item.time = time;
        completed.push(item);
      }
    });
    setTimeout(() => {
      this.setState({
        todoItems: todoData,
        completedTodo: completed
      });
    }, 500);
  }

  searchFunction = (fromDate, toDate, val = 1) => {
    if(val === 1) {
      let newTodo = [];

      this.state.todoItems.forEach(item => {
        let current = new Date(item.date + " 00:00:00");
        let fDate = new Date(fromDate + " 00:00:00");
        let tDate = new Date(toDate + " 00:00:00");

        let fDaysDiff = (current.getTime() - fDate.getTime()) / (1000 * 3600 * 24);
        let tDaysDiff = (current.getTime() - tDate.getTime()) / (1000 * 3600 * 24);
        
        if(fDaysDiff >= 0 && tDaysDiff <= 0) {
          newTodo.push(item);
        }
      });

      if(newTodo.length !== 0) {
        this.setState({
          todoItems: newTodo
        });
      } else {
        alert("No Search Results.");
      }
    } else {
      let todoData = [];
      let newSortType = this.state.sortType;

      this.state.originalData.forEach(item => {
        if(item.status !== 'Completed') {
          todoData.push(item);  
        }
      });

      if (newSortType[this.state.currentSort] === 'asc') {
        newSortType[this.state.currentSort] = 'desc';
      } else if (newSortType[this.state.currentSort] === 'desc') {
        newSortType[this.state.currentSort] = 'asc';
      } 

      this.setState({
        todoItems: todoData,
        sortType: newSortType
      }, () => {
        this.sortTasks(this.state.currentSort);
      });
    }
  }

  aFunctionCall = (data) => {
    this.props.changeLogin(data);
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

    const bgDark = {
      background: "#111",
      color: "white"
    }

    const bgLight = {
      background: "#007bff",
      color: "#555"
    }

    return (
      <div className="belowBody" style={this.props.isDark === true ? bgDark : bgLight}>
        <NavbarAbove 
          toggleModal={this.toggleAddTask}
          searchFunction={this.searchFunction}
          isDark={this.props.isDark}
          aFunctionCall={this.aFunctionCall}
          authToken={this.props.authToken}
          />

        <AddTask 
          show={this.state.show}
          onHide={this.toggleAddTask}
          submit={this.handleSubmit}
          addnewtask={this.addNewTask}
          isDark={this.props.isDark}
          authToken={this.props.authToken}/>

        <div style={this.props.isDark === true ? dark : light} className={this.state.todoItems.length !== 0 ? "todo-table mr-bottom" : "todo-table"}>
            {this.state.todoItems.length !== 0 ?
              <table style={this.props.isDark === true ? dark : light} className="table table-borderless table-responsive">
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
                    Due Date
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
                    completedTask={this.completedTask}/>
                )
              })}
              </tbody>
              </table> :
              <div className="text-center">
                <Image src={logo} fluid />
                <h6 className="text-center">All done for now.<br></br>Click on add task to keep track of your tasks.</h6>
              </div>
              }
        </div>
        <Archive 
          doneItems={this.state.completedTodo}
          isDark={this.props.isDark}/>
      </div>
    )
  }
}

export default Todo;