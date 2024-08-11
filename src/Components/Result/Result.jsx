import CircularProgressBar from '../CommonComponents/CircularProgressBar/CircularProgressBar'
import './Result.css'
import correctIcon from '../../assets/images/correctIcon.png';
import inCorrectIcon from '../../assets/images/incorrectIcon.png';

export default function Result({ answers, Questions ,restart}) {
    var correctAnswers = answers.filter((ans, index) => {
        return ans == Questions[index].answers[0];
    }).length;

    var inCorrectAnswers = answers.filter((ans, index) => {
        return ans != Questions[index].answers[0];
    }).length;

    // var notAnswered = Questions.length - correctAnswers - inCorrectAnswers;

    var correctPercentage = ((correctAnswers / Questions.length) * 100).toFixed(0);
    var inCorrectPercentage = ((inCorrectAnswers / Questions.length) * 100).toFixed(0);
    var notAnsweredPercentage = (100 - (+correctPercentage + +inCorrectPercentage)).toFixed(0);

    // console.log('Correct Answers: ' + correctAnswers)
    // console.log('InCorrect Answers: ' + inCorrectAnswers)
    // console.log('Not Answers: ' + notAnswered)
    return (<>

        <div className="result-container">
            <div className='RetryButton'>
                <button className="Btn" onClick={restart}>
                    <div className="sign"><span class="material-symbols-outlined">
                        restart_alt
                    </span></div>
                    <div className="text">Retry</div>
                </button>
            </div>

            <div className="percentageSection">
                <div className='progressBar-container'>
                    <CircularProgressBar key='correct' progress={correctPercentage} />
                    <span>Correct</span>
                </div>
                <div className='progressBar-container'>
                    <CircularProgressBar key='Incorrect' progress={inCorrectPercentage} />
                    <span>Incorrect</span>
                </div>
                <div className='progressBar-container'>
                    <CircularProgressBar key='Not-Attempted' progress={notAnsweredPercentage} />
                    <span>Unanswered</span>
                </div>
            </div>
            <div className='result'>
                {
                    answers.map((ans, index) => {
                        var isCorrect = false;
                        var classes = 'AnswerStatusContainer '
                        if (ans == Questions[index].answers[0]) {
                            isCorrect = true;
                            classes = 'AnswerStatusContainer '
                        }

                        return (
                            // <div key={index} className={classes}>
                            //     {ans != null ? ans : 'Not Answered'}
                            // </div>
                            <div key={index} className={classes}>
                                <div className="icon">{isCorrect ? <img src={correctIcon} /> : <img src={inCorrectIcon} />}</div>
                                <div className={isCorrect ? 'correctAnswer content' : 'inCorrectAnswer content'}>
                                    <div className="questionText">Q{index + 1}. {Questions[index].question}</div>
                                    <div className="answerContent">
                                        <div className='answerText'>Selected Answer: {ans != null ? ans : 'Not Answered'}</div>
                                        <div className='answerText'>Correct Answer: {Questions[index].answers[0]}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>)
}