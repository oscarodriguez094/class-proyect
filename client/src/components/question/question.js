import React, {Component} from 'react';
import {connect} from 'react-redux';

import Answers from './answers.js';
import AddAnswer from './addAnswer.js';

import {getUser, deleteQuestion, deleteQuestionsByPath} from '../../store/actions';

const mapStateToProps = (state) =>({
  user: state.user.user,
  userLoc: state.auth.user,
})
const mapDispatchToProps = (dispatch) => ({
  getUser: payload => dispatch(getUser(payload)),
  doDeleteQuestion: payload => dispatch(deleteQuestion(payload)),
  deleteQuestionsByPath: payload=> dispatch(deleteQuestionsByPath(payload))
});

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,user: null,
    };
  }

  componentDidMount(){
    this.props.getUser({id: this.props.question.owner, questionId: this.props.question.id});
  }

  componentWillUnmount(){
    this.props.deleteQuestionsByPath({id: this.props.question.id})
  }

  render() {
    const {question,userLoc, user} = this.props;
    const {collapse} = this.state;
    let checkUser;

    const handleCollapseClick = (e) => {
      e.preventDefault();
      this.setState({
        collapse: !this.state.collapse,
      });

      return false;
    };

    const handleDelete= (e) =>{
      e.preventDefault();
      this.props.doDeleteQuestion({id: question.id})
    }

    const handleCheckUser = (user) => {
      if (user !== checkUser) checkUser = user ;
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className={`glyphicon glyphicon-${collapse ? 'plus' : 'minus'}`}
            style={{cursor: 'pointer'}}
            onClick={handleCollapseClick} />{' '}
            {question.text}
            Create by :{user.map((user, key) => user.user.id === question.owner && user.id === question.id  ? handleCheckUser(user.user.login): null)}
            {checkUser}
            {userLoc ? userLoc.id === question.owner ? <button className="btn btn-default" onClick={handleDelete}> Delete Question </button> : null :null}
        </div>
        {collapse ? null : <Answers question={question} loading />}
        {collapse ? null : <AddAnswer question={question} />}
      </div>
    );
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Question);
