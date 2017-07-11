import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import * as utils from '../utils';

class NewCommentItem extends Component {

  render() {
    const comment = this.props.comment;
    return (
      <div className='CommentItem'>
        {comment.data.by} { ' ' }
        {utils.getTimeSinceSubmission(comment.data.time)} ago { ' ' }
        | { ' ' } <Link to={utils.generateStoryIdLink(comment.data.id)}>parent</Link> { ' ' }
        | { ' ' } on:  <br/>
        <span>{utils.renderHTML(comment.data.text)}</span>
        <br/>
      </div>
    )
  }
}

export default NewCommentItem;