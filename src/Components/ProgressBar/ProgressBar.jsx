import { useEffect, useState } from 'react'
import './ProgressBar.css'

export default function ProgressBar({answers,answerState,timer,timeout}){
    const [remainingTime,setRemainingTime] = useState(0);
    if(answerState=='Answered'){
        timer = 3000;
    }
    else if(answerState == 'Correct' || answerState == 'Incorrect'){
        timer=1000;
    }
    useEffect(()=>{
        setRemainingTime(0);
        const interval=setInterval(() => {
            setRemainingTime((prevTime)=>prevTime+10)
        }, 10);

        return ()=>{
            setRemainingTime(0)
            clearInterval(interval)
        }
    },[answerState,answers])

    var classes= 'progressBar'
    if(remainingTime >= timer){
        setRemainingTime(0);
        if(timer==10000)
        timeout();
        return(<></>)
    }
    if(answerState=='Answered'){
        classes='progressBar progressBarCoolDown';
    }
    else if(answerState == 'Correct'){
        classes='progressBar progreesBarCorrect'
    }
    else if(answerState == 'Incorrect'){
        classes='progressBar progressBarIncorrect';
    }

   
    return (<>
            <progress value={remainingTime} max={timer}  className={classes} />
    </>)
}