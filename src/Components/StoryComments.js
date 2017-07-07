import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StoryCommentsStore from '../Stores/StoryCommentsStore';

@observer
class StoryComments extends Component {

  numComments;
  
  constructor() {
    super();
    this.state = {
      storyCommentsStore: ''
    }
  }

  componentWillMount() {
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
    let txt = document.createElement('textarea');
    txt.innerHTML = str;
    str = txt.value;
    if (str) {
      return str.replace(/<[^>]*>/g, '');
    }
    return '';
  }

  formatStoryItem(jsonStory) {
    let storyItem;
    if (jsonStory !== undefined) {
      let story = this.state.storyCommentsStore.jsonStory.data;
      this.numComments = story.descendants;
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
    if (jsonComments !== undefined) {
      return jsonComments.map(comment => 
        <div className='CommentItem' key={comment.data.id} style={{marginLeft: (comment.data.level * 50) +'px', marginTop: 5+'px'}}>
          {comment.data.by} { ' ' }
          {this.getTimeSinceSubmission(comment.data.time)} ago { ' ' } <br/>
          {this.renderHTML(comment.data.text)}
        </div>
      )
    } else {
      return (
        <div>No Comments</div>
      )
    }
  }

  dfsOrderComments(level, startIndex, oldArr, newArr) {
    if (startIndex >= oldArr.length) {
      return newArr;
    }
    newArr.push(oldArr[startIndex]);
    for (var i = startIndex; i < oldArr.length; i++) {
      if (oldArr[i].data.level === level && oldArr[i].data.parent === oldArr[startIndex].data.id) {
        newArr = this.dfsOrderComments(level+1, i, oldArr, newArr);
      }	
    }
    return newArr;
  }

  initOrderComments(oldArr, newArr) {
    for (var i = 0; i < oldArr.length; i++) {
      if (oldArr[i].data.level === 0) {
        newArr = this.dfsOrderComments(1,i,oldArr,newArr);
      }
    }
    return newArr;
  }

  render() {
    const storyItem = this.formatStoryItem(this.state.storyCommentsStore.jsonStory);
    let commentsList = <div>Loading comments....</div>;

    let storyComments = this.state.storyCommentsStore.jsonComments;
    let orderedStoryComments = [];
    if (storyComments.length >= this.numComments) {
      commentsList = this.formatComments(this.initOrderComments(storyComments,orderedStoryComments));
    }

    return (
      <div className="StoryComments">
        {storyItem}
        <br/>
        <div>
          {commentsList}
        </div>
      </div>
    );
  }
}

export default StoryComments;