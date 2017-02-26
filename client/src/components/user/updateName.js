import React, {Component} from 'react';

export default class updateName extends Component{
  constructor(props){
    super(props);
    console.log(this.props)
  }
  render(){
    let nameInput;

    const handleClick = (e) => {
      e.preventDefault();
      const {updateUser, userId} = this.props;
      const login = nameInput.value;
      this.props.updateUser({login, id: userId});
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
           update Login name
        </div>
        <div className="panel-body">
        <input
          type="text"
          className="form-control"
          id="answerInput"
          placeholder="Enter your answer..."
          ref={(i) => { nameInput = i; }}
        />
        </div>
        <div className="panel-footer">
          <button className="btn btn-default" onClick={handleClick}> Update </button>
        </div>
      </div>

    );
  }
}
