import React, { Component } from 'react';
import * as utils from '../utils';
import { Link } from 'react-router-dom';

class StoryCommentItem extends Component {
  
  render() {
    const comment = this.props.comment.data;
    return (
      <div className='CommentItem' key={comment.id} style={{marginLeft: (comment.level * 50) +'px', marginTop: 5+'px'}}>
        <Link to={utils.generateUserLink(comment.by)}>{comment.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(comment.time)} ago { ' ' } <br/>
        {utils.renderHTML(comment.text)}
      </div>
    )
  }
}

export default StoryCommentItem;