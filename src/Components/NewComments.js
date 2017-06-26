import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link  } from 'react-router-dom';
import { newcomments } from '../Stores/NewCommentsStore';

@observer
class NewComments extends Component {

  loadMoreComments() {
    //console.log('asuh');
    newcomments.loadMoreComments();
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

  generateStoryIdLink(id) {
    return '/story/'+id;
  }

  renderHTML(str) {
    //console.log(str);
    if (str) {
      return str.replace(/<[^>]*>/g, '');
    }
    return '';
  }

  render() {
    const commentList = newcomments.json.map( comment => 
      <div className='CommentItem' key={comment.data.id}>
        {comment.data.by} { ' ' }
        {this.getTimeSinceSubmission(comment.data.time)} ago { ' ' }
        | { ' ' } <Link to={this.generateStoryIdLink(comment.data.id)}>parent</Link> { ' ' }
        | { ' ' } on:  <br/>
        <span>{this.renderHTML(comment.data.text)}</span>
        <br/>
      </div>
    )

    return (
      <div>
        <ol>
          {commentList}
        </ol>
        <button onClick={this.loadMoreComments.bind(this)}>More</button>
      </div>
    )
  }
}

export default NewComments;
