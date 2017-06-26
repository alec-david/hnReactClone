import { observable, computed, toJS } from 'mobx';
import axios from 'axios';

let numComments = 30;
let fbURL = 'https://hacker-news.firebaseio.com/v0/';
let fbURLItem = fbURL + 'item/';

class NewComments {
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
        console.log(maxItem.data);
        for (var i = maxItem.data; i > maxItem.data-numComments; i--) {
          axios
            .get(fbURLItem + i + '.json')
            .then(comment => {
              if (comment.data.type === 'comment') {
                this.comments.push(comment);
              }
            })
        }
        this.maxItemId = maxItem.data-numComments;
      })
  }

  loadMoreComments() {
    for (var i = this.maxItemId; i > (this.maxItemId-numComments); i--) {
      axios
        .get(fbURLItem + i + '.json')
        .then(comment => {
          if (comment.data.type === 'comment') {
            this.comments.push(comment);
          }
        })
    }
    this.maxItemId -= numComments;
  }
}


const newcomments = new NewComments();
export {newcomments};