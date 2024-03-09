    import React, { useState } from 'react';
    import { v4 as uuidv4 } from 'uuid';
    import InputBar from './InputBar';
    import ToDoListItem from './ToDoListItem';
    import FilterTask from './FilterTask';
    import SortingTask from './SortingTask';
    import EditBar from './EditBar';

    function ToDoListTable() {
        const [tasks, setTasks] = useState([]);
        const [filteredTasks, setFilteredTasks] = useState([]);
        const [originalTasks, setOriginalTasks] = useState([]);
        const [showFirstComponent, setShowFirstComponent] = useState(true);
        const [editedTask, setEditedTask] = useState();

        const toggleComponent= () => {
            setShowFirstComponent(prevState => !prevState);
        };

        const handleEditTask1 = (task) => {
            toggleComponent();
            setEditedTask(task);
        };

        const handleEditTask2 = (editedTask) => {
            if (editedTask) {
                const updatedTasks = tasks.map(task =>
                    task.id === editedTask.id ? editedTask : task
                );
                setTasks(updatedTasks);
                const updatedOriginalTasks = originalTasks.map(task =>
                    task.id === editedTask.id ? editedTask : task
                );
                setOriginalTasks(updatedOriginalTasks);
        
                setEditedTask(null);
            }
        };
        

        const addTask = (newTask) => {
            const newIdTask = { ...newTask, id: uuidv4(), checked: false };
            setTasks([...tasks, newIdTask]);
            setOriginalTasks([...tasks, newIdTask]);
        };

        const deleteTask = (index) => {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
            setOriginalTasks(updatedTasks);
        };

        const toggleCheck = (taskID) => {
            const updatedTask = tasks.map(item => {
                if (item.id === taskID) {
                    return { ...item, checked: !item.checked };
                } else {
                    return item;
                }
            });
            const checkedTasks = updatedTask.filter(item => item.checked);
            const uncheckedTasks = updatedTask.filter(item => !item.checked);
            const newTaskList = [...uncheckedTasks, ...checkedTasks];

            setTasks(newTaskList);
            setOriginalTasks(newTaskList);
        };

        const handleFilterChange = (filterBy) => {
            let filteredTasks = [];

            switch (filterBy) {
                case 'checked':
                    filteredTasks = originalTasks.filter(task => task.checked);
                    break;
                case 'unchecked':
                    filteredTasks = originalTasks.filter(task => !task.checked);
                    break;
                default:
                    filteredTasks = originalTasks;
            }

            setFilteredTasks(filteredTasks);
            setTasks(filteredTasks);
        };

        const handleSortChange = (sortValue) => {
            if(filteredTasks.length > 0){
            let sortedTasks = [...filteredTasks];

            switch (sortValue) {
                case 'date':
                    sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case 'time':
                    sortedTasks.sort((a, b) => new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time));
                    break;
                default:
                    sortedTasks = filteredTasks;
                    break;
            }

            setTasks(sortedTasks);
            } else {

                let sortedTasks = [...originalTasks];

            switch (sortValue) {
                case 'date':
                    sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case 'time':
                    sortedTasks.sort((a, b) => new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time));
                    break;
                default:
                    sortedTasks = originalTasks;
                    break;
            }
            setTasks(sortedTasks);
            }
        };

        return (
            <div className="container">
                <div className="todo-list">
                    <h1>To-Do List</h1>
                        {showFirstComponent ? (
                        <InputBar
                           onAdd={addTask}
                        />
                    ) : (
                        <EditBar
                            toggleComponent={toggleComponent}
                            onEditTask2={handleEditTask2}
                            task={editedTask}
                        />
                    )}
                        <FilterTask onFilterChange={handleFilterChange} />
                        <SortingTask onSortChange={handleSortChange} />
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <ToDoListItem
                                    key={task.id}
                                    task={task}
                                    onDelete={() => deleteTask(index)}
                                    onToggleCheck={() => toggleCheck(task.id)}
                                    toggleComponent={toggleComponent}
                                    onEditTask1={handleEditTask1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    export default ToDoListTable;
