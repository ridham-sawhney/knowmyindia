import { useEffect, useState } from 'react'
import './Clock.css'

export default function Clock({timer}){
    const [remainingTime,setRemainingTime] = useState(0);
    useEffect(()=>{
        setRemainingTime(0)
        const interval=setInterval(() => {
            setRemainingTime((prevTime)=>prevTime+1000)
        }, 1000);
        return ()=>{
            clearInterval(interval)
        }
    },[timer])

    if(remainingTime >= timer){
        return(<></>)
    }
    
    return (<>
             <div className="clock">
                <span className="material-symbols-outlined">
                    alarm
                </span>
                <p>00:{(timer/1000 - remainingTime/1000) < 10 ? 0 : ''}{timer/1000 - remainingTime/1000}</p>
            </div>
    </>)
}