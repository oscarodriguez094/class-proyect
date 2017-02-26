import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getAnswers, addObservable, removeObservable, deleteAnswersByQuestion} from '../../store/actions';
import {registerQuestionObservable} from '../../store/realtime';
import {Spinner} from '../../components/spinner';
import SingleAnswer from './singleAnswer';

const mapStateToProps = (state, {question}) => ({
  answering: state.questions.answering &&
             state.questions.answering[question.id],
});

const mapDispatchToProps = dispatch => ({
  getAnswers: questionId => dispatch(getAnswers(questionId)),
  addObservable: observable => dispatch(addObservable(observable)),
  removeObservable: (observable, question) => dispatch(removeObservable({observable, question})),
  deleteAnswersByQuestion: payload => dispatch(deleteAnswersByQuestion(payload)),
});

class Answers extends Component {

  constructor(props) {
    super(props);
    const {question, getAnswers, addObservable, loading} = this.props;
    getAnswers(question.id);
    const {payload: observable} = addObservable(registerQuestionObservable(question.id));
    this.state = {
      loading,
      observable,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question !== nextProps.question && nextProps.question.answers) {
      this.setState({loading: false});
    }
  }

  componentWillUnmount() {
    const {removeObservable, question} = this.props;
    const {observable} = this.state;
    removeObservable(observable, question);
    this.props.deleteAnswersByQuestion({id: this.props.question.id})
  }


  render() {
    const {question, answering} = this.props;
    const {loading} = this.state;

    return (
      <div className="panel-body">
        {loading ? <Spinner /> :
          <div>
            <ul className="list-group">
              {question.answers.map((answer, i) =>
                <SingleAnswer key={i} answer={answer.answer} user={answer.user} questionId={question.id}/>
              )}
              {answering ? <li className="list-group-item" key={question.answers.length}><Spinner /></li> : null}
            </ul>
            {!answering && question.answers.length === 0 ? 'No answers yet!' : null}
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
