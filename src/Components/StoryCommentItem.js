import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';
import * as styles from '../styles';

class StoryCommentItem extends Component {
  
  render() {
    const comment = this.props.comment.data;
    return (
      <div className='StoryCommentItem' key={comment.id} style={{marginLeft: (comment.level * 50) +'px', marginTop: 15+'px', color: '#646464', fontSize: '14px'}}>
        <Link to={utils.generateUserLink(comment.by)} style={styles.styleLink}>{comment.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(comment.time)} ago { ' ' } <br/>
        <span style={styles.styleCommentText}>{utils.renderHTML(comment.text)}</span>
      </div>
    )
  }
}

export default StoryCommentItem;