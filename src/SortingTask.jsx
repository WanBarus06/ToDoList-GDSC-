import React from 'react';

function SortingTask({ onSortChange }) {
    const handleSortChange = (event) => {
        const sortValue = event.target.value;
        onSortChange(sortValue);
    };

    return (
        <div className="filter-task">
            <label htmlFor="sort"></label>
            <select id="sort" onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="date">Date</option>
                <option value="time">Time</option>
            </select>
        </div>
    );
}

export default SortingTask;
