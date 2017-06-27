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

  loadStoryItem(id) {
    axios
      .get(fbURLItem + id + '.json')
      .then(item => {
        this.story = item;
        item.data.kids.forEach(entry => {
          axios
            .get(fbURLItem + entry + '.json')
            .then(comment => {
              console.log(comment);
              this.comments.push(comment);
            })
        });
      })
  }
}

export default StoryCommentsStore;