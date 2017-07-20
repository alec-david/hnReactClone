import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import * as utils from '../utils';
import * as styles from '../styles';

class NewCommentItem extends Component {

  render() {
    let comment = this.props.comment.data;
    return (
      <div className='NewCommentItem' style={styles.styleComment}>
        <Link to={utils.generateUserLink(comment.by)} style={styles.styleLink}>{comment.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(comment.time)} ago { ' ' }
        | { ' ' } <Link to={utils.generateStoryIdLink(comment.parentStory.id)} style={styles.styleLink}>parent</Link> { ' ' }
        | { ' ' } on: <Link to={utils.generateStoryIdLink(comment.parentStory.id)} style={styles.styleLink}>{comment.parentStory.title}</Link><br/>
        <span style={styles.styleCommentText}>{utils.renderHTML(comment.text)}</span>
        <br/>
      </div>
    )
  }
}

export default NewCommentItem;