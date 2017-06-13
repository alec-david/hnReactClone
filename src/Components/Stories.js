import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { stories } from '../Stores/StoriesStore';

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
    return urlStr[1];
  }

  render() {
    const storyList = stories.json.map( story => 
      <li className='StoryItem' key={story.id}>
        <a href={story.url}><strong>{story.title}</strong></a> ({this.simplifyURL(story.url)})<br/>
        {story.score} points by {story.by} { ' ' } | { ' ' }
        <a href='#' onClick={this.hideStory.bind(this, story.id)}>hide</a> { ' ' } | { ' ' }
        {story.descendants} comments <br/>
      </li>
    )

    return (
      <div>
        <ul>
          {storyList}
        </ul>
        <button onClick={this.goToNextPage.bind(this)}>More</button>
      </div>
    )
  }
}

export default Stories;