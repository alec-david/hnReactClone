import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StoryItem from './StoryItem';
import StoriesStore from '../stores/StoriesStore';

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

  goToNextPage() {
    this.numStories += 30;
    this.state.stories.getStoriesForNextPage();
  }

  generateAllStories() {
    const stories = this.state.stories;
    if (stories.json.length >= this.numStories) {
      return stories.json.map( story =>
        <StoryItem story={story} key={story.data.id} stories={stories}/>
      )
    }
    return <div>Loading stories....</div>;
  }

  render() {
    const storyList = this.generateAllStories();
    return (
      <div className="Stories">
        <ol>
          {storyList}
        </ol>
        <button onClick={this.goToNextPage.bind(this)}>More</button>
      </div>
    )
  }
}

export default Stories;