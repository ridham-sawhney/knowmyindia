import './Container.css';
import { QuestionList } from '../../Providers/QuestionProvider';
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
    const [Questions,setQuestions] = useState([...QuestionList].sort(()=>Math.random()-0.5))
    const [answers, setAnswers] = useState([]);
    const [responseState, updateResponseState] = useState(STATES.UNANSWERED);
    const shuffledAnswers = useRef([]);
    const activeQuestionIndex = responseState == STATES.UNANSWERED ? answers.length : answers.length - 1;
    const handleSelectAnswer = useCallback((answer) => {
        console.log("Previous Answers",answers)
        console.log("Select Answer : "+answer);
        setAnswers((prevAnswers) =>  [...prevAnswers, answer]);
        if (answer != null) {
            updateResponseState(STATES.ANSWERED);
            var timeout = setTimeout(() => {
                if (answer == Questions[activeQuestionIndex].answers[0]) {
                    console.log(answer + '=='+ Questions[activeQuestionIndex].answers[0])
                    updateResponseState(STATES.CORRECT);
                }
                else {
                    console.log(answer + '!='+ Questions[activeQuestionIndex].answers[0])
                    updateResponseState(STATES.INCORRECT);
                }
                var timeout = setTimeout(() => {
                    // setAnswers((prevAnswers) => [...prevAnswers, answer]);
                    updateResponseState(STATES.UNANSWERED);
                }, 800);
            }, 1500);
        }
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(function handleSkipAnswer() {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);
    // const handleSkipAnswer = useCallback(() => {
    // }, [])
    var timer = 10000
    if(responseState==STATES.ANSWERED){
        timer = 1500;
    }
    else if(responseState == STATES.CORRECT || responseState == STATES.INCORRECT){
        timer=800;
    }
    if (Questions.length == answers.length) {
        return (<>
            <Result answers={answers}/>
        </>)
    }

    // const aState = responseState;
    if(responseState==STATES.UNANSWERED){
        shuffledAnswers.current =  [...Questions[activeQuestionIndex].answers].sort(()=>Math.random()-0.5);
    }
    return (<>
        <div className='Quiz-Container'>
            <ProgressBar key={timer} answerState={responseState} timer={timer} timeout={responseState==STATES.UNANSWERED ? handleSkipAnswer: undefined} />
            <div className='Question'>
                <h2>{activeQuestionIndex + 1}. {Questions[activeQuestionIndex].question}</h2>
            </div>
            <div className='Answers'>
                {
                    shuffledAnswers.current.map((ans) => {
                        var classes = 'answerButton';
                        if (responseState == STATES.CORRECT && answers[activeQuestionIndex] == ans) {
                            classes = 'answerButton correct'
                        }
                        else if (responseState == STATES.INCORRECT && answers[activeQuestionIndex] == ans) {
                            classes = 'answerButton incorrect'
                        }
                        else if (responseState == STATES.ANSWERED && answers[activeQuestionIndex] == ans) {
                            classes = 'answerButton answered'
                        }

                        if((responseState == STATES.INCORRECT || responseState == STATES.CORRECT) && ans == Questions[activeQuestionIndex].answers[0]){
                            classes='answerButton correct'
                        }
                        return (<button key={ans} className={classes} disabled={responseState!=STATES.UNANSWERED} onClick={() => {console.log('Button Clicked : ' + ans); handleSelectAnswer(ans) }}> {ans}</button>)
                    })
                }
            </div>
            <br />
            <Clock key={activeQuestionIndex} timer={timer} />
        </div>
    </>
    )
}