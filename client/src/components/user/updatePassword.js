import React, {Component} from 'react';

import {updateUser} from '../../store/actions';


export default class updatePassword extends Component{
  constructor(props){
    super(props);
  }

  render(){

    let passwordInput, passwordRepeatInput;

    const handleClickPassword = (e) => {
      e.preventDefault();
      const password = passwordInput.value;
      const passwordRepeat = passwordRepeatInput.value;
      this.props.updateUser({password, passwordRepeat, id:this.props.userId});
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
           update Password
        </div>
        <div className="panel-body">
        <input
          type="password"
          className="form-control"
          id="answerInput"
          placeholder="Enter your answer..."
          ref={(i) => { passwordInput= i; }}
        />
        <br/>
        <input
          type="password"
          className="form-control"
          id="answerInput"
          placeholder="Enter your answer..."
          ref={(i) => { passwordRepeatInput= i; }}
        />
        </div>
        <div className="panel-footer">
          <button className="btn btn-default" onClick={handleClickPassword}> Update </button>
        </div>
      </div>

    );
  }
}
