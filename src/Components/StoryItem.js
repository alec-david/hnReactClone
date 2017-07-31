import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils/utils';
import * as styles from '../utils/styles';

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
      return this.checkIfListStoryOrJob();
    }
    return this.checkIfSelfOrRegularStory();
  }

  checkIfListStoryOrJob() {
    const story = this.props.story.data;
    if (story.descendants === undefined) {
      return this.formatListJob(story);
    }
    return this.formatListStory(story);
  }

  formatListStory(story) {
    return (
      <li className='StoryItem' style={styles.styleStory}>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by <Link to={utils.generateUserLink(story.by)} style={styles.styleLink}>{story.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:;' onClick={this.hideStory.bind(this, story.id)} style={styles.styleLink}>hide</a> { ' ' } | { ' ' }
        <Link to={utils.generateStoryIdLink(story.id)} style={styles.styleLink}>{this.formatNumComments(story.descendants)}</Link> <br/>
      </li>
    )
  }

  formatListJob(story) {
    return (
      <li className='StoryItem' style={styles.styleStory}>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by <Link to={utils.generateUserLink(story.by)} style={styles.styleLink}>{story.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:void(0)' onClick={this.hideStory.bind(this, story.id)} style={styles.styleLink}>hide</a> { ' ' }<br/>
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
      <div style={styles.styleStory}>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' }<br/>
        <div>{utils.renderHTML(story.text)}</div>
      </div>
    )
  }

  formatSelfStory(story) {
    return (
      <div style={styles.styleStory}>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by <Link to={utils.generateUserLink(story.by)} style={styles.styleLink}>{story.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:;' style={styles.styleLink}>{this.formatNumComments(story.descendants)}</a> <br/>
        <div>{utils.renderHTML(story.text)}</div>
      </div>
    )
  }

  formatIndiviualStory(story) {
    return (
      <div style={styles.styleStory}>
        {utils.checkURL(story)} {utils.simplifyURL(story.url)}<br/>
        {story.score} points by <Link to={utils.generateUserLink(story.by)} style={styles.styleLink}>{story.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(story.time)} ago { ' ' } | { ' ' }
        <a href='javascript:;' style={styles.styleLink}>{this.formatNumComments(story.descendants)}</a> <br/>
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