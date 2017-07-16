import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StoriesStore from '../Stores/StoriesStore';
import * as utils from '../utils';

@observer
class Jobs extends Component {

  constructor() {
    super();
    this.state = {
      jobs: ''
    }
  }

  componentWillMount() {
    let jobsStore = new StoriesStore('job');
    this.setState( {
      jobs: jobsStore
    })
  }

  goToNextPage() {
    this.state.jobs.getStoriesForNextPage();
  }

  render() {
    const storyList = this.state.jobs.json.map( job => 
      <li className='jobItem' key={job.data.id}>
        {utils.checkURL(job.data)} {utils.simplifyURL(job.data.url)}<br/>
        {utils.getTimeSinceSubmission(job.data.time)} ago
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