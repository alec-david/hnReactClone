import React, { Component } from 'react';
import { Link  } from 'react-router-dom';

class NewCommentItem extends Component {

  getTimeSinceSubmission(submissionTime) {
    let timeDiff = Math.round(new Date().getTime()/1000.0) - submissionTime;

    let hours = timeDiff/3600;
    if (hours >= 1 && hours < 2) {
      return Math.floor(hours) + ' hour';
    } else if (hours >= 2) {
      return Math.floor(hours) + ' hours';
    } else {
      const minutes = Math.round(timeDiff/60);
      if (minutes === 1) {
        return minutes + ' minute'
      }
      return minutes + ' minutes';
    }
  }

  generateStoryIdLink(id) {
    return '/story/'+id;
  }

  renderHTML(str) {
    let txt = document.createElement('textarea');
    txt.innerHTML = str;
    str = txt.value;
    if (str) {
      return str.replace(/<[^>]*>/g, '');
    }
    return '';
  }

  render() {
    const comment = this.props.comment;
    return (
      <div className='CommentItem'>
        {comment.data.by} { ' ' }
        {this.getTimeSinceSubmission(comment.data.time)} ago { ' ' }
        | { ' ' } <Link to={this.generateStoryIdLink(comment.data.id)}>parent</Link> { ' ' }
        | { ' ' } on:  <br/>
        <span>{this.renderHTML(comment.data.text)}</span>
        <br/>
      </div>
    )
  }
}

export default NewCommentItem;