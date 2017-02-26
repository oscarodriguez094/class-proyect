import React from 'react';
import InfiniteScroll from 'redux-infinite-scroll';
import {connect} from 'react-redux';

import Question from './question';
import {getMoreQuestions, getUser} from '../../store/actions';
import {Spinner} from '../../components/spinner';

const mapStateToProps = state => ({
  hasMore: state.questions.hasMore,
  loadingMore: state.questions.status === 'loading',
  questions: state.questions.questions,
});


const mapDispatchToProps = dispatch => ({
  loadMore: payload => dispatch(getMoreQuestions(payload)),
  getUser: payload => dispatch(getUser(payload)),
});

class  QuestionList extends React.Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){
  }

  render(){
  const onLoadMore = () => loadMore({
    skip: questions.length,
    limit: 10,
  });
  const {questions, loadMore, hasMore, loadingMore, doDeleteQuestion} = this.props
  return (
    <div>
      {!hasMore && questions.length === 0 ?
        <div>No questions yet!</div> :
        <InfiniteScroll
          elementIsScrollable={false}
          loadMore={onLoadMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
          loader={<Spinner />}
        >
          {questions.map((question, index) => (
            <Question key={index} question={question} doDeleteQuestion={doDeleteQuestion} index={index} userOw={question.owner}/>
          ))}
        </InfiniteScroll>
      }
    </div>
  );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
