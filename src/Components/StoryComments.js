import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { storyCommentsStore } from '../Stores/StoryCommentsStore';

@observer
class StoryComments extends Component {

  getId() {
    //console.log(this.props.match.param.id);
  }

  render() {
    return (
      <div className="StoryComments">
        StoryComments what I've been working on.
        { storyCommentsStore.testGet }
      </div>
    );
  }
}

export default StoryComments;