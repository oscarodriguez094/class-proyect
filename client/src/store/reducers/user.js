import * as ActionTypes from '../actionTypes';

const initialState = {user: [], status: 'inited', userAnswers:[]};

export const user = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_USER_ERROR:
    case ActionTypes.GET_QUESTION_ERROR:
      return {...state, status: 'loading'};
    case ActionTypes.GET_USER_SUCCESS: {
      console.log(action)
      const users = state.user.concat(action.payload);
      return {...state, user: users};
    }
    case ActionTypes.GET_USER_ANSWER_SUCCESS:{
      const userAnswers = action.payload.answer ?  state.userAnswers.concat(action.payload) : state.userAnswers;
      return {...state, userAnswers }
    }
    case ActionTypes.DELETE_ANSWERS_BY_QUESTION: {
      const deleteAnswerByQuestion = state.userAnswers.filter(q => q.id !== action.payload.id);
      return {...state, userAnswers: deleteAnswerByQuestion };
    }
    case ActionTypes.DELETE_QUESTION_BY_PATH: {
      const deleteQuestionsByPath = state.user.filter(q => q.id !== action.payload.id);
      return {...state, user: deleteQuestionsByPath };
    }

    default:
      return state;
  }
};
