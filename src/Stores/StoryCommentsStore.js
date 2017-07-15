import { observable, computed, toJS } from 'mobx';
import axios from 'axios';

const fbURLItem = 'https://hacker-news.firebaseio.com/v0/item/';

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

  loadStoryItem(id) {
    axios
      .get(fbURLItem + id + '.json')
      .then(item => {
        this.story = item;
        if(item.data.kids !== undefined) {
          item.data.kids.forEach(entry => {
            return this.loadStoryComments(entry,0);
          })
        }
      })
  }

  loadStoryComments(id, level) {
    return axios
      .get(fbURLItem + id + '.json')
      .then(item => {
        if (!item.data.deleted) {
          item.data.level = level;
          this.comments.push(item);
        }
        if (item.data.kids !== undefined) {
          item.data.kids.forEach(entry => {
            this.loadStoryComments(entry,level+1);
          })
        }
      })
  }
}

export default StoryCommentsStore;