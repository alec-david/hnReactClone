import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StoryCommentsStore from '../stores/StoryCommentsStore';
import StoryCommentItem from './StoryCommentItem';
import StoryItem from './StoryItem'

@observer
class StoryComments extends Component {

  numComments;
  
  constructor() {
    super();
    this.state = {
      storyCommentsStore: ''
    }
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    let storyComments = new StoryCommentsStore(id);
    this.setState( {
      storyCommentsStore: storyComments
    })
  }

  formatStoryItem(story) {
    if (story !== undefined) {
      this.numComments = story.data.descendants;
      return <StoryItem story={story} key={story.data.id}/>
    }
    return <div>Loading....</div>
  }

  formatComments(jsonComments) {
    if (jsonComments !== undefined && jsonComments.length !== 0) {
      return jsonComments.map(comment => 
        <StoryCommentItem comment={comment} key={comment.data.id}/>
      )
    }
    return <div>No Comments</div>
  }

  dfsOrderComments(level, startIndex, oldArr, newArr) {
    if (startIndex >= oldArr.length) {
      return newArr;
    }
    newArr.push(oldArr[startIndex]);
    for (var i = startIndex; i < oldArr.length; i++) {
      if (oldArr[i].data.level === level && oldArr[i].data.parent === oldArr[startIndex].data.id) {
        newArr = this.dfsOrderComments(level+1, i, oldArr, newArr);
      }	
    }
    return newArr;
  }

  initOrderComments(oldArr) {
    let newArr = [];
    for (var i = 0; i < oldArr.length; i++) {
      if (oldArr[i].data.level === 0) {
        newArr = this.dfsOrderComments(1,i,oldArr,newArr);
      }
    }
    return newArr;
  }

  generateCommentsList(storyComments, story) {
    if (storyComments.length >= this.numComments) {
      return this.formatComments(this.initOrderComments(storyComments));
    } else if (story && story.data.type === 'job') {
      return <div></div>
    }
    return <div>Loading comments....</div>;
  }

  render() {
    const storyItem = this.formatStoryItem(this.state.storyCommentsStore.jsonStory);
    const commentsList = this.generateCommentsList(this.state.storyCommentsStore.jsonComments, this.state.storyCommentsStore.jsonStory);

    return (
      <div className="StoryComments">
        {storyItem}
        <br/>
        <div>
          {commentsList}
        </div>
      </div>
    );
  }
}

export default StoryComments;