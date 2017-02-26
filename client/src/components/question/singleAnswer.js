import React, {Component} from 'react';
import {connect} from 'react-redux';


import {deleteAnswer, getUser, getUserAnswer} from '../../store/actions';

const mapStateToProps = (state) =>({
  users: state.auth.user,
  userAnswers: state.user.userAnswers,
})
const mapDispatchToProps = dispatch => ({
  deleteAnswer : payload => dispatch(deleteAnswer(payload)),
  getUserAnswer: payload=> dispatch(getUserAnswer(payload)),
});

class Answer extends Component {

  constructor(props) {
    super(props);
    this.state = {user : null}
  }

  componentWillMount(){
    this.props.getUserAnswer({id: this.props.user, questionId: this.props.questionId, answer: this.props.answer})
  }

  render() {
    const handleDelete = () =>{
      const {answer, questionId, deleteAnswer} = this.props;
      this.props.deleteAnswer({id: questionId, text:answer});
    }
    const {answer} =this.props;

    return (
      <span>

      <li className="list-group-item" >{answer}&nbsp; &nbsp; &nbsp; Answered by &nbsp;
            {this.props.userAnswers.map((a,i)=> a.user.id === this.props.user && a.answer=== this.props.answer? <span key={i}>{a.user.login}</span>: null)}
      {this.props.users.id === this.props.user ?
           <button className="btn btn-default " style={{float: 'right'}} onClick={handleDelete} >Delete </button> : null}
      </li>
      </span>

    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Answer);
