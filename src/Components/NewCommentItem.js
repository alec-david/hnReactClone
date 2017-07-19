import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import * as utils from '../utils';

const styleCommentLink = {
    color: '#646464',
    textDecoration: 'none'
};
const styleComment = {
  color: '#646464',
  paddingTop: '10px'
}

class NewCommentItem extends Component {

  render() {
    let comment = this.props.comment.data;
    return (
      <div className='NewCommentItem' style={styleComment}>
        <Link to={utils.generateUserLink(comment.by)} style={styleCommentLink}>{comment.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(comment.time)} ago { ' ' }
        | { ' ' } <Link to={utils.generateStoryIdLink(comment.parentStory.id)} style={styleCommentLink}>parent</Link> { ' ' }
        | { ' ' } on: <Link to={utils.generateStoryIdLink(comment.parentStory.id)} style={styleCommentLink}>{comment.parentStory.title}</Link><br/>
        <span style={{color: 'black'}}>{utils.renderHTML(comment.text)}</span>
        <br/>
      </div>
    )
  }
}

export default NewCommentItem;