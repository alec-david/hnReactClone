import React, { Component } from 'react';
import * as utils from '../utils';

class StoryCommentItem extends Component {
  
  render() {
    const comment = this.props.comment;
    return (
      <div className='CommentItem' key={comment.data.id} style={{marginLeft: (comment.data.level * 50) +'px', marginTop: 5+'px'}}>
        {comment.data.by} { ' ' }
        {utils.getTimeSinceSubmission(comment.data.time)} ago { ' ' } <br/>
        {utils.renderHTML(comment.data.text)}
      </div>
    )
  }
}

export default StoryCommentItem;