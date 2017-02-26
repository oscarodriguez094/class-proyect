import {initAuth, login, githubLogin, register, logout} from './auth';
import {addNotification} from './notifications';
import {addObservable, openConnection, closeConnection} from './realtime';
import {helloWorld} from './helloworld';
import {getMoreQuestions,
        answerQuestion,
        createQuestion,
        getAnswers,
        removePendingQuestionNotifications,
        deleteAnswer,
        deleteQuestion,getQuestionId} from './questions';
import {getUser,getUserAnswer, updateUser} from './user';

export default [
  // auth
  initAuth,
  login,
  githubLogin,
  register,
  logout,
  addNotification,
  addObservable,
  openConnection,
  closeConnection,
  // hello world
  helloWorld,
  // questions
  getMoreQuestions,
  answerQuestion,
  createQuestion,
  getAnswers,
  removePendingQuestionNotifications,
  deleteAnswer,
  deleteQuestion,
  getUser,
  getUserAnswer,
  updateUser,
];
