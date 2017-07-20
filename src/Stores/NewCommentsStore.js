import { observable, computed, toJS } from 'mobx';
import axios from 'axios';

const numComments = 30;
const fbURL = 'https://hacker-news.firebaseio.com/v0/';
const fbURLItem = fbURL + 'item/';

class NewCommentsStore {
  maxItemId;

  @observable comments = [];

  constructor() {
    this.loadInitialComments();
  }

  @computed get json() {
    return toJS(this.comments);
  };

  loadInitialComments() {
    axios
      .get(fbURL + 'maxitem.json')
      .then(maxItem => {
        for (var i = maxItem.data; i > maxItem.data-numComments; i--) {
          axios
            .get(fbURLItem + i + '.json')
            .then(comment => {
              if (comment.data && comment.data.type === 'comment') {
                axios
                  .get(fbURLItem + comment.data.parent + '.json')
                  .then(story => {
                    this.findStoryTitle(story).then(result => {
                      comment.data.parentStory = result;
                      this.comments.push(comment);
                    });
                  })
              }
            })
        }
        this.maxItemId = maxItem.data-numComments;
      })
  }

  findStoryTitle(item) {
    if (item.data) {
      return new Promise(resolve => {
        if (item.data.title) {
          resolve(item.data);
        }
        axios
          .get(fbURLItem + item.data.parent + '.json')
          .then(result => {
            resolve(this.findStoryTitle(result));
        })
      })
    }
    return new Promise(resolve => {
      resolve(null);
    })
  }

  loadMoreComments() {
    for (var i = this.maxItemId; i > (this.maxItemId-numComments); i--) {
      axios
        .get(fbURLItem + i + '.json')
        .then(comment => {
          if (comment.data && comment.data.type === 'comment') {
            axios
              .get(fbURLItem + comment.data.parent + '.json')
              .then(story => {
                this.findStoryTitle(story).then(result => {
                  comment.data.parentStory = result;
                  this.comments.push(comment);
                });
              })
            //this.comments.push(comment);
          }
        })
    }
    this.maxItemId -= numComments;
  }
}

export default NewCommentsStore;