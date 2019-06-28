import React, { Component } from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {
  fetchQuizesById,
  quizAnswerClick,
  retryQuiz
} from '../../store/actions/quiz';

export class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizesById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    const {
      quiz,
      activeQuestion,
      answerState,
      isFinished,
      results,
      loading,
      quizAnswerClick,
      retryQuiz
    } = this.props;

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {loading || !quiz ? (
            <Loader />
          ) : isFinished ? (
            <FinishedQuiz results={results} quiz={quiz} onRetry={retryQuiz} />
          ) : (
            <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={quizAnswerClick}
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

const mapStateToProps = state => {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizesById: id => dispatch(fetchQuizesById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
