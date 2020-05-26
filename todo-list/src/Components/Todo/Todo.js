import React, { Component } from 'react';
import Task from '../Task/Task';
import 'bootstrap/dist/css/bootstrap.min.css';

let todoItems = [
  {
    id: "1",
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    status: 'Completed',
    label: 'Shopping',
    date: Date(Date.now()).toString()
  },
  {
    id: "2",
    title: "Study",
    description: "Read Algebra and History textbook for upcoming test",
    status: 'Pending',
    label: 'Study',
    date: Date(Date.now()).toString()
  },
  {
    id: "3",
    title: "Sally's books",
    description: "Go to library to rent sally's books",
    status: 'New',
    label: 'Personal',
    date: Date(Date.now()).toString()
  },
  {
    id: "4",
    title: "Article",
    description: "Write article on how to use django with react",
    status: 'Pending',
    label: 'Work',
    date: Date(Date.now()).toString()
  }
];

class Todo extends Component {
  render() {
    return (
      <div>
        {todoItems.map(item => {
          return <Task
            id={item.id}
            title={item.title}
            desc={item.description}
            status={item.status}
            label={item.label}
            date={item.date}
          />
        })}
      </div>
    )
  }
}

export default Todo;