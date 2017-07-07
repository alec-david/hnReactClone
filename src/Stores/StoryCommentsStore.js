import { observable, computed, toJS } from 'mobx';
import axios from 'axios';

let fbURLItem = 'https://hacker-news.firebaseio.com/v0/item/';

class StoryCommentsStore {
  @observable story;
  @observable comments = [];

  promises = [];

  constructor(id) {
    this.loadStoryItem2(id);
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

  loadStoryItem2(id) {
    axios
      .get(fbURLItem + id + '.json')
      .then(item => {
        this.story = item;
        if(item.data.kids !== undefined) {
          item.data.kids.forEach(entry => {
            return this.loadStoryComments2(entry,0);
          })
        }
      })
  }

  loadStoryComments2(id, level) {
    return axios
      .get(fbURLItem + id + '.json')
      .then(item => {
        if (!item.data.deleted) {
          item.data.level = level;
          this.comments.push(item);
        }
        if (item.data.kids !== undefined) {
          item.data.kids.forEach(entry => {
            this.loadStoryComments2(entry,level+1);
          })
        }
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
        if (item.data.kids !== undefined) {
          item.data.kids.forEach(entry => {
            console.log(entry);
            this.getCommentPromise(entry, level+1).then(comment => {
              this.loadStoryComments(entry, level+1)
              this.comments.push(comment);
            });
          })
        }
      })
  }

  getCommentPromise(id, level) {
    return new Promise((resolve, reject) => {
      axios
        .get(fbURLItem + id + '.json')
        .then(comment => {
          comment.data.level = level;
          resolve(comment);
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}

export default StoryCommentsStore;