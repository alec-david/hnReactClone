import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import * as utils from '../utils';
import axios from 'axios';

class NewCommentItem extends Component {

  getParentTitle(comment) {
    return new Promise(resolve => {
      axios
        .get('https://hacker-news.firebaseio.com/v0/item/' + comment.parent + '.json')
        .then(result => {
          if (result.data.title) {
            resolve(result.data);
          } else {
            this.getParentTitle(result.data);
          }
        })
    })
  }

  render() {
    let comment = this.props.comment.data;
    let parentStory;
    this.getParentTitle(comment).then(result => {
      // console.log(result);
    })
    return (
      <div className='CommentItem'>
        <Link to={utils.generateUserLink(comment.by)}>{comment.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(comment.time)} ago { ' ' }
        | { ' ' } <Link to={utils.generateStoryIdLink(comment.parent)}>parent</Link> { ' ' }
        | { ' ' } on: <br/>
        <span>{utils.renderHTML(comment.text)}</span>
        <br/>
      </div>
    )
  }
}

export default NewCommentItem;