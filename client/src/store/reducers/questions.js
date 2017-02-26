import * as ActionTypes from '../actionTypes';

const initialState = {questions: [], status: 'inited', answering: {}, hasMore: true};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_MORE_QUESTIONS:
      return {...state, status: 'loading', error: null};
    case ActionTypes.GET_MORE_QUESTIONS_SUCCESS: {
      console.log(action.payload)
      const hasMore = action.payload.questions.length === 10;
      return {...state, questions: state.questions.concat(action.payload.questions), status: 'done', hasMore};
    }
    case ActionTypes.GET_ANSWERS_ERROR:
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.CREATE_QUESTION_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    case ActionTypes.GET_ANSWERS_SUCCESS:
    case ActionTypes.ANSWER_QUESTION_SUCCESS: {
      const newQuestions = state.questions.map(q => q.id === action.payload.id ? action.payload : q);
      return {
        ...state,
        questions: newQuestions,
        status: 'done',
        answering: action.type === ActionTypes.GET_ANSWERS_SUCCESS ? state.answering : {
          ...state.answering,
          [action.payload.id]: false,
        },
        hasMore: state.hasMore,
      };
    }
    case ActionTypes.ANSWER_QUESTION: {
      const answering = {...state.answering, [action.payload.question.id]: true};
      return {...state, answering};
    }
    case ActionTypes.CREATE_QUESTION_SUCCESS: {
      const newQuestions = [action.payload, ...state.questions];
      return {...state, questions: newQuestions, status: 'done', hasMore: state.hasMore};
    }
    case ActionTypes.DELETE_QUESTION_SUCCESS: {
      const deleteQuestions = state.questions.filter(q => q.id !== action.payload.questions.id);
      return {...state, questions: deleteQuestions };
    }
    default:
      return state;
  }
};
