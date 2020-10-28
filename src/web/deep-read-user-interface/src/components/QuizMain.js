import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';
import {  Button} from '@material-ui/core';


export default class Quiz extends Component {

    constructor(props){
        super(props)
        console.log(props.mcqData)
        this.state = props.mcqData;
    }
    // initiating the local state
    

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { answers, step, score } = this.state;
        if(answer === answers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: answers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { questions, options, correctAnswer, clickedAnswer, step, score } = this.state;
        return(
            <div className="Content">
                {step <= Object.keys(questions).length ? 
                    (<>
                        <Question
                            question={questions[step]}
                        />
                        <Answer
                            answer={options[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <Button variant="outlined" color="default"
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(questions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</Button>
                    </>) : (
                        <div className="finalPage">
                            <h1>Quiz over!</h1>
                            <p>Your score is: {score} of {Object.keys(questions).length}</p>
                        </div>
                    )
                }
            </div>
        );
    }
}