import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateUser} from '../../store/actions';
import Update from '../../components/user/updateName';
import UpdatePassword from '../../components/user/updatePassword';

const mapStateToProps = (state) =>({
  userAuth: state.auth
});

const mapDispatchToProps = (dispatch) =>({
  updateUser: payload => dispatch (updateUser(payload)),
});

class updateUserr extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (

      <span>
        <div className="container">
          name User: {this.props.userAuth.user ? this.props.userAuth.user.login : null}
          <br/>
          registration Date: {this.props.userAuth.user ? this.props.userAuth.user.registrationDate :null}
        </div>

        <Update updateUser={this.props.updateUser} userId={this.props.userAuth.user.id} />
        <UpdatePassword updateUser={this.props.updateUser}  userId={this.props.userAuth.user.id}/>
      </span>
    );
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(updateUserr);
