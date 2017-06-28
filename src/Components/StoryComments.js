import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import StoryCommentsStore from '../Stores/StoryCommentsStore';

@observer
class StoryComments extends Component {
  
  constructor() {
    super();
    this.state = {
      storyCommentsStore: ''
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let x = new StoryCommentsStore(id);
    this.setState( {
      storyCommentsStore: x
    })
  }

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
    //console.log(str);
    if (str) {
      return str.replace(/<[^>]*>/g, '');
    }
    return '';
  }

  formatStoryItem(jsonStory) {
    let storyItem;
    if (jsonStory !== undefined) {
      let story = this.state.storyCommentsStore.jsonStory.data;
      //Check if self post
      if (story.text) {
        storyItem = (
        <div>
          {this.checkURL(story)} {this.simplifyURL(story.url)}<br/>
          {story.score} points by {story.by} { ' ' }
          {this.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
          <a href='javascript:;'>{story.descendants} comments</a> <br/>
          <div>{story.text}</div>
        </div>
      )
      } else {
        storyItem = (
        <div>
          {this.checkURL(story)} {this.simplifyURL(story.url)}<br/>
          {story.score} points by {story.by} { ' ' }
          {this.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
          <a href='javascript:;'>{story.descendants} comments</a> <br/>
        </div>
      )
      }
    } else {
      storyItem = (
        <div>Loading...</div>
      )
    }
    return storyItem;
  }

  formatComments(jsonComments) {
    let commentsList;
    if (jsonComments !== undefined) {
      console.log(jsonComments);
      return jsonComments.slice(1).map(comment => 
        <li className='CommentItem' key={comment.data.id}>
          {this.renderHTML(comment.data.text)}
        </li>
      )
    } else {
      return (
        <li>asuh</li>
      )
    }
  }

  render() {
    const storyItem = this.formatStoryItem(this.state.storyCommentsStore.jsonStory);
    const commentsList = this.formatComments(this.state.storyCommentsStore.jsonComments);
    return (
      <div className="StoryComments">
        {storyItem}
        <br/>
        <ol>
          {commentsList}
        </ol>
      </div>
    );
  }
}

export default StoryComments;