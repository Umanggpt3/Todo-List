import React, { Component } from 'react';

const task = (props) => {
    return (
        <div>
            <p>{props.id}</p>
            <p>{props.title}</p>
            <p>{props.desc}</p>
            <p>{props.status}</p>
            <p>{props.label}</p>
            <p>{props.date}</p>
        </div>
    )
};

export default task;