import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';

class StoryItem extends Component {

  hideStory(id) {
    this.props.stories.removeStoryItem(id);
  }

  formatNumComments(numComments) {
    if (numComments === 0) {
      return "discuss";
    }
    return "" + numComments + " comments"
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
        {story.score} points by <Link to={utils.generateUserLink(story.by)}>{story.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:void(0)' onClick={this.hideStory.bind(this, story.id)}>hide</a> { ' ' } | { ' ' }
        <Link to={utils.generateStoryIdLink(story.id)}>{this.formatNumComments(story.descendants)}</Link> <br/>
      </li>
    )
  }

  checkIfSelfOrRegularStory() {
    const story = this.props.story.data;
    if (story.type === 'job') {
      return this.formatJobStory(story);
    } else if (story.text) {
      return this.formatSelfStory(story);
    }
    return this.formatIndiviualStory(story);
  }

  formatJobStory(story) {
    return (
      <div>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' }<br/>
        <div>{utils.renderHTML(story.text)}</div>
      </div>
    )
  }

  formatSelfStory(story) {
    return (
      <div>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by <Link to={utils.generateUserLink(story.by)}>{story.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:;'>{this.formatNumComments(story.descendants)}</a> <br/>
        <div>{utils.renderHTML(story.text)}</div>
      </div>
    )
  }

  formatIndiviualStory(story) {
    return (
      <div>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by <Link to={utils.generateUserLink(story.by)}>{story.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:;'>{this.formatNumComments(story.descendants)}</a> <br/>
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