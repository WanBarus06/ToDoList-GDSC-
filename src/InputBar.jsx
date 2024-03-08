import React, { useState, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function InputBar({ onAdd }) {
    const [taskName, setTaskName] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        flatpickr("#datepicker", {
            dateFormat: "Y-m-d",
            altInput: true,
            altFormat: "F j, Y",
            onChange: function(selectedDates, dateStr, instance) {
                setDate(dateStr);
            }
        });

        flatpickr("#timepicker", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            altInput: true,
            altFormat: "H:i",
            onChange: function(selectedDates, dateStr, instance) {
                setTime(dateStr);
            }
        });
    }, []);

    const handleAddTask = () => {
        if (taskName.trim() === '' || time.trim() === '' || date.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
    
        const newTask = {
            name: taskName,
            time: time,
            date: date,
        };
    
        onAdd(newTask);
        setTaskName('');
        setTime('');
        setDate('');
    };

    return (
        <div className="add-task">
            <input 
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)} 
                placeholder="Task Name" />
            <input 
                type="text"
                 id="timepicker" 
                 onChange={(e) => setDate(e.target.value)} 
                 placeholder="Time" value={time} />
            <input type="text"
                id="datepicker"
                onChange={(e) => setDate(e.target.value)} 
                placeholder="Date" value={date}  />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default InputBar;
