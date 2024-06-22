import { useEffect, useState } from 'react'
import './ProgressBar.css'

export default function ProgressBar({answerState,timer,timeout}){
    const [remainingTime,setRemainingTime] = useState(0);

    useEffect(()=>{
        const tout=setTimeout(timeout,timer);
        console.log("Timeout Started: ", timer);
        return (()=>{
            console.log('Timeout Cleared',timer)
            clearTimeout(tout);
        })
    },[timer,timeout])
    
    useEffect(()=>{
        console.log('Interval Started');
        setRemainingTime(0);
        const interval=setInterval(() => {
            setRemainingTime((prevTime)=>prevTime+10)
        }, 10);

        return ()=>{
            console.log('Interval Cleared')
            clearInterval(interval)
        }
    },[timeout])

    var classes= 'progressBar'
    // if(remainingTime >= timer){
    //     setRemainingTime(0);
    //     if(timer==10000)
    //     timeout();
    //     return(<></>)
    // }
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