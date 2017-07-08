import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import StoriesStore from '../Stores/StoriesStore';

@observer
class Stories extends Component {

  numStories;

  constructor() {
    super();
    this.numStories = 30;
    this.state = {
      stories: ''
    }
  }

  componentWillMount() {
    let type = this.props.type;
    let storiesStore = new StoriesStore(type);
    this.setState( {
      stories: storiesStore
    })
  }

  goToNextPage(stories) {
    this.numStories += 30;
    stories.getStoriesForNextPage();
  }

  hideStory(id) {
    console.log(id);
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

  generateAllStories(stories) {
    if (stories.json.length >= this.numStories) {
      return stories.json.map( story => 
        <li className='StoryItem' key={story.data.id}>
          {this.checkURL(story.data)} {this.simplifyURL(story.data.url)}<br/>
          {story.data.score} points by {story.data.by} { ' ' }
          {this.getTimeSinceSubmission(story.data.time)} ago { ' ' } | { ' ' }
          <a href='#' onClick={this.hideStory.bind(this, story.data.id)}>hide</a> { ' ' } | { ' ' }
          <Link to={this.generateStoryIdLink(story.data.id)}>{story.data.descendants} comments</Link> <br/>
        </li>
      )
    }
    return <div>Loading stories....</div>;
  }

  render() {
    const stories = this.state.stories;
    const storyList = this.generateAllStories(stories);

    return (
      <div>
        <ol>
          {storyList}
        </ol>
        <button onClick={this.goToNextPage.bind(this,stories)}>More</button>
      </div>
    )
  }
}

export default Stories;