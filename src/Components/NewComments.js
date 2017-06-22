import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link  } from 'react-router-dom';

@observer
class NewComments extends Component {

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

  generateStoryIdLink(id) {
    return '/story/'+id;
  }

  render() {
    const comments = this.props.comments;
    const commentList = comments.json.map( comment => 
      <li className='CommentItem' key={comment.id}>
        {comment.by} { ' ' }
        {this.getTimeSinceSubmission(comment.time)} ago { ' ' }
        | { ' ' } <Link to={this.generateStoryIdLink(comment.id)}>parent</Link> { ' ' }
        | { ' ' } on:  <br/>
        <span>{comment.text}</span>
        <br/>
      </li>
    )

    return (
      <div>
        <ol>
          {commentList}
        </ol>
        <button>More</button>
      </div>
    )
  }
}

export default NewComments;
