import axios from 'axios';
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_QUESTION } from './actionTypes';

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axios.post(
      `https://quiz-test-b404f.firebaseio.com/quizes.json`,
      getState().create.quiz
    );
    dispatch(resetQuizCreation());
  };
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_QUESTION
  };
}

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  };
}
