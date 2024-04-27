import React from 'react';

const FilterOption = ({ filterNum, filterOptions, currentFilterOption }) => {

    currentFilterOption.current = filterOptions[0];

    return (
        <div className='filter-group'>
            <label>Filter {filterNum}</label>
            <select defaultValue={currentFilterOption} onChange={(e) => currentFilterOption.current = e.target.value}>
                {filterOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default FilterOption;