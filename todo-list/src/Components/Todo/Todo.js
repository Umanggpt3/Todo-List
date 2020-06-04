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
    showAdd: false,
    todoItems: [],
    completedTodo: [],
    originalData: [],
    sortType: {
      status: '',
      label: '',
      date: 'asc',
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

        let OGdata = [];
        let keyId = 1;

        data.forEach(item => {
          let newData = {
            key: keyId, 
            id: item["id"],
            description: item["description"],
            status: item["status"],
            label: item["label"],
            date: item["due_date_time"].slice(0,10),
            time: item["due_date_time"].slice(11,19)
          };
          keyId++;
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
            this.sortTasks(this.state.currentSort);
            this.forceUpdate();
          });
        });
    });
  }

  componentDidMount() {
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
    this.setState({ 
      showAdd: !this.state.showAdd
    });
  }

  addNewTask = () => {
    this.updateData();
    this.forceUpdate();
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

  sortTasks = (val, isTrue = false) => {
    let newTodo =  [
      ...this.state.todoItems
    ];

    let newSortType = this.state.sortType;
    
    let order = newSortType[val];

    if(isTrue === true) {
      if (newSortType[val] === 'asc') {
        order = 'desc';
      } else {
        order = 'asc';
      }
    }
  
    newTodo.sort(this.compareValues(val, order));
    newSortType[val] = order;

    this.setState({
      todoItems: newTodo,
      sortType: newSortType,
      currentSort: val
    });
  }

  completedTask = (id, date, time) => {
    this.state.todoItems.forEach(item => {
      if(id.toString().localeCompare(item.id.toString()) === 0) {
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
        .then(response => {
          if(response.status !== 200) {
              alert("There was some problem with that. We're currently working on fixing it. Thank You.");
          }
        });
      }
    });

    setTimeout(() => {
      this.updateData();
    }, 100);
    
  }

  searchFunction = (fromDate, toDate, val = 1) => {
    if(val === 1) {
      let newTodo = [];
      let completed = [];

      this.state.originalData.forEach(item => {
        let current = new Date(item.date + " 00:00:00");
        let fDate = new Date(fromDate + " 00:00:00");
        let tDate = new Date(toDate + " 00:00:00");

        let fDaysDiff = (current.getTime() - fDate.getTime()) / (1000 * 3600 * 24);
        let tDaysDiff = (current.getTime() - tDate.getTime()) / (1000 * 3600 * 24);
        
        if(fDaysDiff >= 0 && tDaysDiff <= 0) {
          if(item.status === "Completed") {
            completed.push(item);
          } else {
            newTodo.push(item);
          }
        }
      });

      if(newTodo.length !== 0) {
        this.setState({
          todoItems: newTodo,
          completedTodo: completed
        });
      } else {
        alert("No Search Results.");
      }
    } else {
      this.updateData();
    }
  }

  aFunctionCall = (data) => {
    this.props.changeLogin(data);
  }

  removeItem = (id) => {
    this.state.originalData.forEach(item => {
      if(id.toString().localeCompare(item.id.toString()) === 0) {
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
        .then(response => {
          if(response.status !== 200){
            alert("There was some problem with that. We're currently working on fixing it. Thank You.");
          }
        });
      }
    });

    setTimeout(() => {
      this.updateData();
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
          show={this.state.showAdd}
          onHide={this.toggleAddTask}
          addnewtask={this.addNewTask}
          isDark={this.props.isDark}
          authToken={this.props.authToken}/>

        <div style={this.props.isDark === true ? dark : light} className={this.state.todoItems.length !== 0 ? "todo-table mr-bottom" : "todo-table"}>
            {this.state.todoItems.length !== 0 ?
              <table style={this.props.isDark === true ? dark : light} className="table table-borderless table-responsive">
              <thead className="thead-light">
                <tr className="head">
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Title</th>
                  <th onClick={() => this.sortTasks("status", true)} scope="col">
                    <div className="sort-icon">
                      Status
                      {this.getSortIcon("status")}
                    </div>
                  </th>
                  <th onClick={() => this.sortTasks("label", true)} scope="col">
                    <div className="sort-icon">
                    Label
                      {this.getSortIcon("label")}
                    </div>
                  </th>
                  <th onClick={() => this.sortTasks("date", true)} scope="col">
                    <div className="sort-icon">
                    Date
                      {this.getSortIcon("date")}
                    </div>
                  </th>
                  <th onClick={() => this.sortTasks("time", true)} scope="col">
                    <div className="sort-icon">
                    Time
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
                    key={item.key}
                    id={item.id}
                    desc={item.description}
                    status={item.status}
                    label={item.label}
                    date={item.date}
                    time={item.time}
                    isDark={this.props.isDark}
                    completedTask={this.completedTask}
                    removeItem={this.removeItem}
                    authToken={this.props.authToken}
                    updateData={this.updateData}/>
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