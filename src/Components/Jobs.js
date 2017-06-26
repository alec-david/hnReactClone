import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { jobs } from '../Stores/StoriesStore';
import { Link  } from 'react-router-dom';

@observer
class Jobs extends Component {

  goToNextPage() {
    jobs.getStoriesForNextPage();
  }

  hideStory(id) {
    console.log(id);
  }

  //check if url is blank (if it's an ask post)
  checkURL(job) {
    if (!job.url) {
      return (
        <Link to={this.generateStoryIdLink(job.id)}><strong>{job.title}</strong></Link>
      );
    } else {
      return (
        <a href={job.url}><strong>{job.title}</strong></a>
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

  render() {
    const storyList = jobs.json.map( job => 
      <li className='jobItem' key={job.data.id}>
        {this.checkURL(job.data)} {this.simplifyURL(job.data.url)}<br/>
        {this.getTimeSinceSubmission(job.data.time)} ago
      </li>
    )

    return (
      <div>
        <ol className="jobs">
          {storyList}
        </ol>
        <button onClick={this.goToNextPage.bind(this)}>More</button>
      </div>
    );
  }
}

export default Jobs;