import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { stories } from '../Stores/StoriesStore';
import { Link  } from 'react-router-dom';

@observer
class Stories extends Component {

  goToNextPage() {
    stories.getStoriesForNextPage();
  }

  hideStory(id) {
    console.log(id);
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

  generateStoryIdLink(id) {
    return '/story/'+id;
  }

  render() {
    const storyList = stories.json.map( story => 
      <li className='StoryItem' key={story.id}>
        <a href={story.url}><strong>{story.title}</strong></a> {this.simplifyURL(story.url)}<br/>
        {story.score} points by {story.by} { ' ' }
        {this.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='#' onClick={this.hideStory.bind(this, story.id)}>hide</a> { ' ' } | { ' ' }
        <Link to={this.generateStoryIdLink(story.id)}>{story.descendants} comments</Link> <br/>
      </li>
    )

    return (
      <div>
        <ol>
          {storyList}
        </ol>
        <button onClick={this.goToNextPage.bind(this)}>More</button>
      </div>
    )
  }
}

export default Stories;