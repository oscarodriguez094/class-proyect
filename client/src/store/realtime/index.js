import React from 'react';
import {Observable} from 'rxjs/Observable';
import {rethinkdb} from 'rethinkdb-websocket-client';
import _ from 'lodash';

import * as Actions from '../actions';
import {UpdateQuestionNotification} from '../../components/question';

const r = rethinkdb;

export const registerQuestionObservable = questionId => (conn, getState) =>
  Observable.fromPromise(r.table('Question').filter({id: questionId}).changes().run(conn))
  .switchMap(cursor => Observable.create((observer) => {
    cursor.each((err, row) => {
      if (err) throw err;
      observer.next(row);
    });
    return function() {
      cursor.close();
    };
  }).debounceTime(5000))
  .map(row => Object.assign({}, {new : row.new_val}, {old:row.old_val}))
  .filter((question) => {
    if (!question) {
      return false;
    }
    if(question.new){
      const storedQuestion = _.find(getState().questions.questions, {id: question.new.id});
      return !storedQuestion || !_.isEqual(storedQuestion.answers, question.new.answers);
    }
    if(question.old){
      const storedQuestion = _.find(getState().questions.questions, {id: question.old.id});
      return !storedQuestion || !_.isEqual(storedQuestion.answers, question.old.answers);
    }
  })
  .map((question) => {
      const notificationId = Actions.getNextNotificationId();
      return Actions.addNotificationAction({
        text: <UpdateQuestionNotification notificationId={notificationId} question={question.new} />,
        alertType: 'warning',
        autoDisposable: false,
        refCode: `update-question-${question.id}`,
        });

  })
  .catch(error => Observable.of(
    Actions.addNotificationAction({text: error.toString(), alertType: 'danger'}),
  ));
