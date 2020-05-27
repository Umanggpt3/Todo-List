import React from 'react';

const task = (props) => {
    return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.desc}</td>
            <td>{props.status}</td>
            <td>{props.label}</td>
            <td>{props.date}</td>
        </tr>
    )
};

export default task;