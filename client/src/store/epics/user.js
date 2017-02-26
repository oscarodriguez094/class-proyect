import {Observable} from 'rxjs/Observable';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, ajaxErrorToMessage} from '../../util';
import {server as serverConfig} from '../../../config';

const host = serverConfig.host;
const port = serverConfig.port;

export const getUser = action$ => action$
  .ofType(ActionTypes.GET_USER)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/user/${payload.id}`, headers)
    .map(res => res.response)
    .map(user => ({
      type: ActionTypes.GET_USER_SUCCESS,
      payload:{user, id :payload.questionId}
    }))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_USER_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[get more questions] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

  export const getUserAnswer = action$ => action$
    .ofType(ActionTypes.GET_USER_ANSWER)
    .map(signRequest)
    .mergeMap(({headers, payload}) => Observable
      .ajax.get(`http://${host}:${port}/api/user/${payload.id}`, headers)
      .delayInDebug(2000)
      .map(res => res.response)
      .map(user => ({
        type: ActionTypes.GET_USER_ANSWER_SUCCESS,
        payload: {user, id: payload.questionId, answer: payload.answer},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.GET_USER_ANSWER_ERROR,
          payload: {error},
        },
        Actions.addNotificationAction(
          {text: `[get answers] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
        ),
      )),
    );

    export const updateUser = action$ => action$
      .ofType(ActionTypes.UPDATE_USER)
      .map(signRequest)
      .switchMap(({headers, payload}) => Observable
        .ajax.post(`http://${host}:${port}/api/user/${payload.id}`,payload, headers)
        .delayInDebug(2000)
        .map(res => res.response)
        .mergeMap(user => Observable.of({
          type: ActionTypes.UPDATE_USER_SUCCESS,
          payload: {user},
        },
          Actions.changeNav({user})
        ))
        .catch(error => Observable.of(
          {
            type: ActionTypes.UPDATE_USER_ERROR,
            payload: {error},
          },
          Actions.addNotificationAction(
            {text: `[get answers] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
          ),
        )),
      );
