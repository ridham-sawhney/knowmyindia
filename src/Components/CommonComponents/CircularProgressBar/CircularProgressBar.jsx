import { useEffect, useRef, useState } from 'react';
import './CircularProgressBar.css';

export default function CircularProgressBar({ progress }) {
    const [_progress, setProgress] = useState(0);
    const radius = 64; // same as the SVG circle's radius
    const circumference = 2 * Math.PI * radius;
    const dashOffset = useRef(circumference - (_progress / 100) * circumference)
    useEffect(() => {
        console.log('Interval Started')
        var progresstout = setInterval(() => {
            if (_progress <= progress) {
                setProgress((prevProgress) => prevProgress + 1);
            }
            console.log(_progress + 'is less than ' + progress)
            if (_progress > progress) {
                clearInterval(progresstout)
            }
            else {
                dashOffset.current = circumference - (_progress / 100) * circumference;
            }
        }, 10);
        return () => {
            clearInterval(progresstout)
        }
    }, [_progress])


    return (
        <>
            <div className='circular-progressBar'>
                <div className="outerCircle">
                    <div className="innerCircle">
                        <span>{_progress < progress ? _progress : progress}%</span>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
                    <defs>
                        <linearGradient id="GradientColor">
                            <stop offset="0%" stopColor="#DA22FF" />
                            <stop offset="100%" stopColor="#9733EE" />
                        </linearGradient>
                    </defs>
                    <circle cx="72" cy="70" r="64" strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: dashOffset.current,
                            transition: 'stroke-dashoffset 0.5s ease',
                        }} />
                </svg>
            </div>
        </>);
}