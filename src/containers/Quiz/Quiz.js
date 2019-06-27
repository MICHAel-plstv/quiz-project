import React, { Component } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

export class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true
  };

  onAnswerHandler = answerId => {
    const { activeQuestion, answerState, results, quiz } = this.state;

    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === 'succes') {
        return;
      }
    }

    if (answerId === quiz[activeQuestion].rightAnswer) {
      if (!results[quiz[activeQuestion].id]) {
        results[quiz[activeQuestion].id] = 'succes';
      }

      this.setState({
        answerState: { [answerId]: 'succes' },
        results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: activeQuestion + 1,
            answerState: null
          });
        }

        window.clearInterval(timeout);
      }, 1000);
    } else {
      results[quiz[activeQuestion].id] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results
      });
    }
  };

  isQuizFinished() {
    const { activeQuestion, quiz } = this.state;
    return activeQuestion + 1 === quiz.length;
  }

  onRetryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://quiz-test-b404f.firebaseio.com/quizes/${
          this.props.match.params.id
        }.json`
      );
      const quiz = response.data;

      this.setState({
        quiz,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      quiz,
      activeQuestion,
      answerState,
      isFinished,
      results,
      loading
    } = this.state;
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {loading ? (
            <Loader />
          ) : isFinished ? (
            <FinishedQuiz
              results={results}
              quiz={quiz}
              onRetry={this.onRetryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={this.onAnswerHandler}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              answerState={answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
