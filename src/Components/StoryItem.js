import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';

class StoryItem extends Component {

  hideStory(id) {
    this.props.stories.removeStoryItem(id);
  }

  checkListOrIndividual() {
    if (this.props.stories) {
      return this.formatListStory();
    }
    return this.checkIfSelfOrRegularStory();
  }

  formatListStory() {
    const story = this.props.story.data;
    return (
      <li className='StoryItem'>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by {story.by} { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:void(0)' onClick={this.hideStory.bind(this, story.id)}>hide</a> { ' ' } | { ' ' }
        <Link to={utils.generateStoryIdLink(story.id)}>{story.descendants} comments</Link> <br/>
      </li>
    )
  }

  checkIfSelfOrRegularStory() {
    const story = this.props.story.data;
    if (story.text) {
      return this.formatSelfStory(story);
    }
    return this.formatIndiviualStory(story);
  }

  formatSelfStory(story) {
    return (
      <div>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by {story.by} { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:;'>{story.descendants} comments</a> <br/>
        <div>{utils.renderHTML(story.text)}</div>
      </div>
    )
  }

  formatIndiviualStory(story) {
    return (
      <div>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by {story.by} { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
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