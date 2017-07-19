import React, { Component } from 'react';
import * as utils from '../utils';
import { Link } from 'react-router-dom';

const styleCommentLink = {
    color: '#646464',
    textDecoration: 'none'
};

class StoryCommentItem extends Component {
  
  render() {
    const comment = this.props.comment.data;
    return (
      <div className='StoryCommentItem' key={comment.id} style={{marginLeft: (comment.level * 50) +'px', marginTop: 15+'px', color: '#646464'}}>
        <Link to={utils.generateUserLink(comment.by)} style={styleCommentLink}>{comment.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(comment.time)} ago { ' ' } <br/>
        <span style={{color: 'black'}}>{utils.renderHTML(comment.text)}</span>
      </div>
    )
  }
}

export default StoryCommentItem;