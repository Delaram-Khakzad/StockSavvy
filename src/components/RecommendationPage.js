// RecommendationPage.js
import React, { useState, useRef } from 'react';
import '../styles/RecommendationPage.css'; // Import CSS file
import { useLocation } from 'react-router-dom';
import FilterOption from './FilterOption';

const RecommendationPage = () => {
    const location = useLocation();
    const previousState = location.state;
    const previousUserInput = previousState ? previousState.recommendation : '';

    const numFilters = 3;
    const filterOptions = ['option1', 'option2'];
    const filterRefs = useRef(Array(numFilters).fill().map(() => React.createRef()));
    

    const [userInput, setUserInput] = useState(previousUserInput || '');

    return (
        <div className="container">
            <h1 >Recommendation Page</h1>
            <div className="filters">
                {Array(numFilters).fill().map((_, i) => i).map((filterNum) => (
                    <FilterOption key={filterNum} filterNum={filterNum+1} filterOptions={filterOptions} currentFilterOption={filterRefs.current[filterNum]}/>
                ))
                }
            </div>
            <div className="input-text" >
                <label >Enter Text</label>
                <textarea rows="4" placeholder="Enter some text..." defaultValue={userInput} onChange={(e) => setUserInput(e.target.value)} ></textarea>
            </div>
            <button>Get Recommendation</button>
            <div className="result">
                {/* Space to show resulting text */}
            </div>
        </div>
    );
}

export default RecommendationPage;
