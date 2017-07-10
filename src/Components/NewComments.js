import React, { Component } from 'react';
import { observer } from 'mobx-react';
import NewCommentsStore from '../Stores/NewCommentsStore';
import NewCommentItem from './NewCommentItem'

@observer
class NewComments extends Component {

  constructor() {
    super();
    this.state = {
      newCommentsStore: ''
    }
  }

  componentWillMount() {
    let newComments = new NewCommentsStore();
    this.setState( {
      newCommentsStore: newComments
    })
  }

  loadMoreComments() {
    this.state.newCommentsStore.loadMoreComments();
  }

  render() {
    const commentList = this.state.newCommentsStore.json.map( comment => 
      <NewCommentItem comment={comment} key={comment.data.id}/>
    )

    return (
      <div>
        <ol>
          {commentList}
        </ol>
        <button onClick={this.loadMoreComments.bind(this)}>More</button>
      </div>
    )
  }
}

export default NewComments;
