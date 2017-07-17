import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import * as utils from '../utils';

class NewCommentItem extends Component {

  render() {
    let comment = this.props.comment.data;
    return (
      <div className='NewCommentItem'>
        <Link to={utils.generateUserLink(comment.by)}>{comment.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(comment.time)} ago { ' ' }
        | { ' ' } <Link to={utils.generateStoryIdLink(comment.parentStory.id)}>parent</Link> { ' ' }
        | { ' ' } on: <Link to={utils.generateStoryIdLink(comment.parentStory.id)}>{comment.parentStory.title}</Link><br/>
        <span>{utils.renderHTML(comment.text)}</span>
        <br/>
      </div>
    )
  }
}

export default NewCommentItem;