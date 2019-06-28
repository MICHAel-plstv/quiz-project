import axios from 'axios';
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_START,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ
} from './actionTypes';

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const quizes = [];
      const response = await axios.get(
        `https://quiz-test-b404f.firebaseio.com/quizes.json`
      );
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizesById(id) {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(
        `https://quiz-test-b404f.firebaseio.com/quizes/${id}.json`
      );
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  };
}

export function quizNextQuestion(activeQuestion) {
  return {
    type: QUIZ_NEXT_QUESTION,
    activeQuestion
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const { activeQuestion, answerState, results, quiz } = getState().quiz;

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
      dispatch(quizSetState({ [answerId]: 'succes' }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(getState().quiz)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(activeQuestion + 1));
        }

        window.clearInterval(timeout);
      }, 1000);
    } else {
      results[quiz[activeQuestion].id] = 'error';
      dispatch({ [answerId]: 'error' }, results);
    }
  };
}

export function isQuizFinished(state) {
  const { activeQuestion, quiz } = state;
  return activeQuestion + 1 === quiz.length;
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  };
}
