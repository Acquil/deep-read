import React from 'react';
import './Question.css';

const Question = (props) => {
    return (
        <h1>{props.question}</h1>
    );
}

export default Question;