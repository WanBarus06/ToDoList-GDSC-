import React, { useState } from 'react';

function FilterTask({ onFilterChange }) {
    const [filterBy, setFilterBy] = useState('all');

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterBy(value);
        onFilterChange(value);
    };

    return (
        <div className="filter-task">
            <select value={filterBy} onChange={handleFilterChange}>
                <option value="all">All Tasks</option>
                <option value="checked">Checked Tasks</option>
                <option value="unchecked">Unchecked Tasks</option>
            </select>
        </div>
    );
}

export default FilterTask;
