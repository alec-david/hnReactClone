import React, { Component } from 'react';

class StoryCommentItem extends Component {

  //check if url is blank (if it's an ask post)
  checkURL(story) {
    if (!story.url) {
      return (
        <a href='javascript:;'><strong>{story.title}</strong></a>
      );
    } else {
      return (
        <a href={story.url}><strong>{story.title}</strong></a>
      );
    }
  }

  simplifyURL(urlStr) {
    let expression = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
    let regex = new RegExp(expression);
    if (urlStr === undefined) {
      return '';
    }
    urlStr = urlStr.match(regex);
    return '(' + urlStr[1] + ')';
  }

  getTimeSinceSubmission(submissionTime) {
    let timeDiff = Math.round(new Date().getTime()/1000.0) - submissionTime;

    let hours = timeDiff/3600;
    if (hours >= 1 && hours < 2) {
      return Math.floor(hours) + ' hour';
    } else if (hours >= 2) {
      return Math.floor(hours) + ' hours';
    } else {
      return Math.round(timeDiff/60) + ' minutes';
    }
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
      <div className='CommentItem' key={comment.data.id} style={{marginLeft: (comment.data.level * 50) +'px', marginTop: 5+'px'}}>
        {comment.data.by} { ' ' }
        {this.getTimeSinceSubmission(comment.data.time)} ago { ' ' } <br/>
        {this.renderHTML(comment.data.text)}
      </div>
    )
  }
}

export default StoryCommentItem;