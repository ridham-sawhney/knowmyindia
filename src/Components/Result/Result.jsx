import './Result.css'

export default function Result({ answers }) {
    return (<div className='result'>
        {
            answers.map((ans,index) => <div key={index}>{ans!=null ? ans: 'Not Answered'}</div>)
        }
    </div>)
}