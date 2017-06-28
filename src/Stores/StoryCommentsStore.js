import { observable, computed, toJS } from 'mobx';
import axios from 'axios';

let fbURLItem = 'https://hacker-news.firebaseio.com/v0/item/';

class StoryCommentsStore {
  @observable story;
  @observable comments = [];

  constructor(id) {
    this.loadStoryItem(id);
  }

  @computed get jsonStory() {
    return toJS(this.story);
  }

  @computed get jsonComments() {
    return toJS(this.comments);
  };

  // loadStoryItem(id) {
  //   let currentLevel = 0;
  //   axios
  //     .get(fbURLItem + id + '.json')
  //     .then(item => {
  //       this.story = item;
  //       item.data.kids.forEach(entry => {
  //         currentLevel = 0;
  //         axios
  //           .get(fbURLItem + entry + '.json')
  //           .then(comment => {
  //             comment.data.level = currentLevel;
  //             this.comments.push(comment);
  //           })
  //       });
  //     })
  // }

  loadStoryItem(id) {
    axios
      .get(fbURLItem + id + '.json')
      .then(item => {
        this.story = item;
        this.loadStoryComments(item.data.id, 0);
      })
  }

  loadStoryComments(id, level) {
    /*
    if (root === null) {
      return;
    }
    comment.data.level = level;
    this.comments.push(comment)
    for (Node n : root.adjacent()) {
      loadStoryComments(n.id, level+1);
    }
    */

    axios
      .get(fbURLItem + id + '.json')
      .then(item => {
        item.data.level = level;
        this.comments.push(item);
        if (item.data.kids !== undefined) {
          item.data.kids.forEach(entry => {
            console.log(entry);
            this.loadStoryComments(entry, level+1);
          })
        }
      })
  }
}

export default StoryCommentsStore;