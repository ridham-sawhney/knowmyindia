import { useEffect, useState } from 'react'
import './ProgressBar.css'

export default function ProgressBar({timer,timeout}){
    const [remainingTime,setRemainingTime] = useState(0);
    useEffect(()=>{
        const interval=setInterval(() => {
            setRemainingTime((prevTime)=>prevTime+10)
        }, 10);
        return ()=>{
            clearInterval(interval)
        }
    },[])

    if(remainingTime >= timer){
        timeout();
        return(<></>)
    }
    
    return (<>
            <progress value={remainingTime} max={timer}  className='progressBar' />
    </>)
}