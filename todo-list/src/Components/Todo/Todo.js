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
      date: 'desc',
      time: ''
    },
    currentSort: "date",
    username: ""
  };

  UNSAFE_componentWillMount() {
    console.log("In Component Will Mount");
    this.updateData();
  }

  updateData = () => {
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
            let nowDate = Date.now();
            let dueDate = new Date(item.date + " " + item.time);
            let daysDiff = (dueDate.getTime() - nowDate) / (1000 * 3600 * 24);

            if(item.status !== 'Completed') {
              if(daysDiff < 0) {
                item.status = "Overdue";
              } else if(daysDiff <= 2) {
                item.status = "Pending";
              } else {
                item.status = "Ongoing";
              }
              todoData.push(item);  
            } else {
              completed.push(item);
            }
          });
      
          this.setState({
              todoItems: todoData,
              completedTodo: completed
          }, () => {
            console.log(this.state.originalData);
            console.log(this.state.todoItems);
            console.log(this.state.completedTodo);
          });
        });
    });
  }

  componentDidMount() {
    this.sortTasks('date');

    this.fetchUsername();
  }

  fetchUsername = () => {
    let token = ("Token " + this.props.authToken).toString();
        
    const requestOptions = {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token,
        }
    };

    fetch('http://127.0.0.1:8000/user/getinfo/', requestOptions)
    .then(response => response.json())
    .then(data => {
        this.setState({
          username: data["first_name"]
        });
    });
  }

  toggleAddTask = () => {
    this.setState({ show: !this.state.show });
  }

  addNewTask = (newitem) => {
    this.updateData();
    this.forceUpdate();

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
    this.state.todoItems.forEach(item => {
      if(desc.localeCompare(item.description) === 0) {
        item.status = "Completed";
        item.date = date;
        item.time = time;

        let updateItem = {
          "id": item.id,
          "description": item.description,
          "status": item.status,
          "label": item.label,
          "date": item.date,
          "time": item.time
        }

        console.log(updateItem);

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
        .then(response => response)
        .then(data => {
            console.log(data);
        });
      }
    });

    setTimeout(() => {
      this.updateData();
      this.forceUpdate();
    }, 100);
    
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

  removeItem = (desc) => {
    this.state.originalData.forEach(item => {
      if(desc.localeCompare(item.description) === 0) {
        let removeItem = {
          "id": item.id,
          "description": item.description,
          "status": item.status,
          "label": item.label,
          "date": item.date,
          "time": item.time
        }

        let token = ("Token " + this.props.authToken).toString();
        
        const requestOptions = {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify(removeItem) 
        };

        fetch('http://127.0.0.1:8000/item/delete', requestOptions)
        .then(response => response)
        .then(data => {
            console.log(data);
        });
      }
    });

    setTimeout(() => {
      this.updateData();
      this.forceUpdate();
    }, 100);
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
          uname={this.state.username}
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
                  <th scope="col"></th>
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
                    completedTask={this.completedTask}
                    removeItem={this.removeItem}/>
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
          removeItem={this.removeItem}
          isDark={this.props.isDark}/>
      </div>
    )
  }
}

export default Todo;