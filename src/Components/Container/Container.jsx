import './Container.css';
import { Questions } from '../../Providers/QuestionProvider';
import { useCallback, useRef, useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import Clock from '../Clock/Clock';
import Result from '../Result/Result';

const STATES = {
    ANSWERED: 'Answered',
    UNANSWERED: 'Unanswered',
    SUBMIT: 'Submit',
    CORRECT: 'Correct',
    INCORRECT: 'Incorrect'
}

export default function Container() {
    const [answers, setAnswers] = useState([]);
    const [responseState, updateResponseState] = useState(STATES.UNANSWERED);
    const lastAnswerSelected = useRef(undefined);
    const handleSelectAnswer = useCallback((answer) => {
        lastAnswerSelected.current = answer;
        updateResponseState(STATES.ANSWERED);
        var timeout = setTimeout(() => {
            if (answer == Questions[answers.length].answers[0]) {
                updateResponseState(STATES.CORRECT);
            }
            else {
                updateResponseState(STATES.INCORRECT);
            }
            var timeout = setTimeout(() => {
                setAnswers((prevAnswers) => [...prevAnswers, answer]);
                updateResponseState(STATES.UNANSWERED);
            }, 1000);
        }, 3000);
    }, [])

    function handleSkipAnswer(){
        lastAnswerSelected.current = null;
        setAnswers((prevAnswers) => [...prevAnswers, null]);
    }
    // const handleSkipAnswer = useCallback(() => {
    // }, [])
    if(Questions.length == answers.length){
    return (<>
    <Result/>
    </>)
    }


    return (<>
            <div className='Quiz-Container'>
            <ProgressBar answers={answers} answerState={responseState} timer={10000} timeout={handleSkipAnswer} />
            <div className='Question'>
                <h2>{answers.length + 1}. {Questions[answers.length].question}</h2>
            </div>
            <div className='Answers'>
                {
                    Questions[answers.length].answers.map((ans) => {
                        var classes = '';
                        if(responseState == STATES.CORRECT && lastAnswerSelected.current == ans){
                            classes ='correct'
                        }
                        else if(responseState == STATES.INCORRECT && lastAnswerSelected.current == ans ){
                            classes ='incorrect'
                        }
                        else if(responseState == STATES.ANSWERED && lastAnswerSelected.current == ans ){
                            classes ='answered'
                        }
                        return (<button key={ans} className={classes} onClick={() => { handleSelectAnswer(ans) }}> {ans}</button>)
                    })
                }
            </div>
            <br />
            <Clock key={'clock' + answers.length} timer={10000} />
        </div>
    </>
    )
}