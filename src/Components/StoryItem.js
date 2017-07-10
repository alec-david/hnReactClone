import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StoryItem extends Component {

  hideStory(id) {
    this.props.stories.removeStoryItem(id);
  }

  //check if url is blank (if it's an ask post)
  checkURL(story) {
    if (!story.url) {
      return (
        <Link to={this.generateStoryIdLink(story.id)}><strong>{story.title}</strong></Link>
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
    const timeDiff = Math.round(new Date().getTime()/1000.0) - submissionTime;

    const hours = timeDiff/3600;
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

  checkListOrIndividual() {
    if (this.props.stories) {
      return this.formatListStory();
    } else {
      return this.checkIfSelfOrRegularStory();
    }
  }

  formatListStory() {
    const story = this.props.story.data;
    return (
      <li className='StoryItem'>
        {this.checkURL(story)} {this.simplifyURL(story.url)}<br/>
        {story.score} points by {story.by} { ' ' }
        {this.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:void(0)' onClick={this.hideStory.bind(this, story.id)}>hide</a> { ' ' } | { ' ' }
        <Link to={this.generateStoryIdLink(story.id)}>{story.descendants} comments</Link> <br/>
      </li>
    )
  }

  checkIfSelfOrRegularStory() {
    const story = this.props.story.data;
    if (story.text) {
      return this.formatSelfStory(story);
    } else {
      return this.formatIndiviualStory(story);
    }
  }

  formatSelfStory(story) {
    return (
      <div>
        {this.checkURL(story)} {this.simplifyURL(story.url)}<br/>
        {story.score} points by {story.by} { ' ' }
        {this.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:;'>{story.descendants} comments</a> <br/>
        <div>{this.renderHTML(story.text)}</div>
      </div>
    )
  }

  formatIndiviualStory(story) {
    return (
      <div>
        {this.checkURL(story)} {this.simplifyURL(story.url)}<br/>
        {story.score} points by {story.by} { ' ' }
        {this.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:;'>{story.descendants} comments</a> <br/>
      </div>
    )
  }

  render() {
    const story = this.checkListOrIndividual();

    return (
        <div>
          {story}
        </div>
    )
  }


}

export default StoryItem;