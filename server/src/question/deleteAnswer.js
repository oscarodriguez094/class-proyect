// npm packages
import passport from 'passport';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question/:id/answer/:text/delete', passport.authenticate('jwt', {session: false}),
  asyncRequest(async (req, res) => {
    const {id, text} = req.params;

    // get the question
    const question = await Question.get(id);
    // double-check check if question exists
    if (!question) {
      res.status(400).send({error: 'Question not found!'});
      return;
    }

    // append new answer
    const hola = question.answers.filter(a => a.answer !== text);
    question.answers=hola;
    // try saving
    await question.save();

    // send created question back
    res.send(question);
  }));
};
