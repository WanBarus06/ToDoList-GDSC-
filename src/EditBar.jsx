import React, { useState, useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function EditBar({task, onEditTask2, toggleComponent}) {
    const [editedTask, setEditedTask] = useState(task);
    const timepickerRef = useRef(null);
    const datepickerRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    useEffect(() => {

        flatpickr(timepickerRef.current, {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            altInput: true,
            altFormat: 'H:i',
            onChange: function(selectedDates, dateStr, instance) {
                setEditedTask(prevState => ({
                    ...prevState,
                    time: dateStr
                }));
            }
        });

        flatpickr(datepickerRef.current, {
            dateFormat: 'Y-m-d',
            altInput: true,
            altFormat: 'F j, Y',
            onChange: function(selectedDates, dateStr, instance) {
                setEditedTask(prevState => ({
                    ...prevState,
                    date: dateStr
                }));
            }
        });
    }, []);

    const handleEdit = () => {
        onEditTask2(editedTask);
        toggleComponent();
    };

    return (
        <div className="add-task">
            <input
                type="text"
                name="name"
                value={editedTask.name || ""}
                onChange={handleInputChange}
                placeholder="Task Name"
            />
            <input
                type="text"
                ref={timepickerRef}
                placeholder="Time"
                onChange={handleInputChange}
                value={editedTask.time || ""}
            />
            <input
                type="text"
                ref={datepickerRef}
                placeholder="Date"
                onChange={handleInputChange}
                value={editedTask.date || ""}
            />
            <button onClick={handleEdit}>Edit Task</button>
        </div>
    );
}

export default EditBar;
