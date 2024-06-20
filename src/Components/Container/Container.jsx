import './Container.css';
import { Questions } from '../../Providers/QuestionProvider';
import { useRef, useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import Clock from '../Clock/Clock';
export default function Container() {
    const [answers, setAnswers] = useState([]);

    function timeout(){
        setAnswers([...answers,null])
    }



    return (<>
        <div className='Quiz-Container'>
            <ProgressBar key={'progress'+answers.length} timer={10000} timeout={timeout}/>
            <div className='Question'>
                <h2>{Questions[answers.length].question}</h2>
            </div>
            <div className='Answers'>
                {
                    Questions[answers.length].answers.map((ans) => {
                        return (<button key={ans}>{ans}</button>)
                    })
                }
            </div>
            <br />
           <Clock key={'clock'+answers.length}  timer={10000}/>
        </div>
    </>
    )
}