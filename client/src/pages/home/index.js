// npm packages
import React from 'react';
import MediaQuery from 'react-responsive';
import {connect} from 'react-redux';

// our packages
import {QuestionList, QuestionSingle} from '../../components/question';
import {deleteQuestion} from '../../store/actions';

const mapStateToProps = (state) =>({

})
const mapDispatchToProps = (dispatch) => ({
  doDeleteQuestion: payload => dispatch(deleteQuestion(payload)),
});

const Home = (doDeleteQuestion) => (
  <div className="container">
    <MediaQuery query="(min-width: 992px)">
      {(matches) => {
        if (matches) {
          return <QuestionList deleteQuestion={doDeleteQuestion} />;
        } else {
          return <QuestionSingle deleteQuestion={doDeleteQuestion} />;
        }
      }}
    </MediaQuery>
  </div>
);

export default connect (mapStateToProps, mapDispatchToProps) (Home);
