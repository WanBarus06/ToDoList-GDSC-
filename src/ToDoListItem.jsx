import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function ToDoListItem({ onEditTask1,task, onDelete, onToggleCheck, toggleComponent }) {
    function handleToggleCheck(){
        onToggleCheck(task.id);
     }

     const handleEdit = () => {
        onEditTask1(task);
     };

     


     return (
        <tr  key={task.id}>
            <td>
                <input 
                    type="checkbox" 
                    checked={task.checked} 
                    onChange={() => onToggleCheck(task.id)}
                />
            </td>
            <td style={{ textDecoration: task.checked ? 'line-through' : 'none' }}>
                {task.name}
            </td>
            <td>{task.date}</td>
            <td>{task.time}</td>
            <td>
                <button className="delete-button" onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="edit-button" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </td>
        </tr>
        );
    }

    export default ToDoListItem;
