import { useEffect, useState } from "react"
import { LIMIT_QUESTIONS } from "../helpers/quiz.js"
import { questions } from "../helpers/quiz.js"
import { randomQuestion } from "../helpers/quiz.js"
import "../styles/quiz.css"

export const Quiz = () => {
    const [questionOn, setQuestionOn] = useState( questions[randomQuestion()] );
    const [questionNro, setQuestionNro] = useState( 1 );
    const [selectedOption, setSelectedOption] = useState( null );
    const [choseAnswer, setChoseAnswer] = useState( false );
    const [puntuationUser, setPuntuationUser] = useState( {correct: 0, incorrect: 0} );
    const [questionsUsed, setQuestionsUsed] = useState( [] );
    const [finishQuiz, setFinishQuiz] = useState( false );

    const checkQuizIsEnd = () => {
        if(questionNro > questions.length || questionNro > LIMIT_QUESTIONS){
            setFinishQuiz(true);
        }
    }

    useEffect(() => {
        checkQuizIsEnd();
    }, [questionNro])

    const selectedAnswer = (e) => {
        if(selectedOption) return;

        const resp = (e.target.dataset.name).toString();
        setSelectedOption(resp);
        compareAnswer(resp);
    }

    const compareAnswer = (resp) => {
        if(resp === questionOn?.correct){
            setPuntuationUser(prevState => (
                {
                    ...prevState,
                    correct: prevState.correct + 1
                }
            ));
        } else {
            setPuntuationUser(prevState => (
                {
                    ...prevState,
                    incorrect: prevState.incorrect + 1
                }
            ));
        }
        setChoseAnswer(true);
    }

    const nextAnswer = () => {
        const newQuestionUsed = [...questionsUsed, questionOn]
        setQuestionNro(prevState => prevState + 1);
        setQuestionsUsed(newQuestionUsed);   
        setSelectedOption(null);
        setChoseAnswer(false);

        /* Prevent loop */
        if(questions.length <= newQuestionUsed.length) return;

        setQuestionOn(() => {
            let selectRandomId = randomQuestion(); 
            while(newQuestionUsed.some(question => question.id === questions[selectRandomId].id)){
                selectRandomId = randomQuestion();
            }
            return questions[selectRandomId];
        })
    }

    const resetQuiz = () => {
        setQuestionOn( questions[randomQuestion()] );
        setQuestionNro( 1 );
        setSelectedOption( null );
        setChoseAnswer( false );
        setPuntuationUser( {correct: 0, incorrect: 0} );
        setQuestionsUsed( [] );
        setFinishQuiz( false );
    }

    return (
        <div className="simple-quiz">
            <div className="simple-quiz-container container">
                <h2>Simple Quiz</h2>
                <hr />

                {!finishQuiz      
                    ?   <div className="show-quiz">
                            <h2 className="quiz-question">{questionNro}. {questionOn?.title}</h2>
                            <ul>
                                {questionOn?.options.map( (item, index) => (
                                    <li 
                                        onClick={selectedAnswer} 
                                        key={index} 
                                        data-name={item}
                                        className={ (choseAnswer && (item === questionOn?.correct) && (item == selectedOption))
                                                        ? "question-li correct-resp"
                                                        : choseAnswer && selectedOption == item
                                                            ? "question-li incorrect-resp"
                                                            : choseAnswer && item === questionOn?.correct
                                                                ? "question-li correct-resp"
                                                                : "question-li"}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {choseAnswer && (
                                <div className="quiz-next-container">
                                    <button onClick={nextAnswer}>Next</button>
                                </div>
                            )}             
                        </div>
                    :   <div className="quiz-final-results">
                            <p className="final-correct">Correct: {puntuationUser?.correct}</p>
                            <p className="final-incorrect">Incorrect: {puntuationUser?.incorrect}</p>
                            <p className="final-porcent">
                                {(puntuationUser?.correct * 100 / (questionNro - 1)).toFixed(2)} %
                            </p>
                            <button className="quiz-reset" onClick={resetQuiz}>
                                Play again
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}