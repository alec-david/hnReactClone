import { observable, computed, toJS } from 'mobx';
import { fb } from '../Firebase/firebaseService';

let pageNum = -1;
let numStories = 30;

class NewStories {
  @observable newStories = [];

  constructor() {
    this.getNewStoriesForNextPage();
  }

  @computed get json() {
    return toJS(this.newStories);
  };

  getNewStoriesForNextPage() {
    pageNum++;
    for (var i = pageNum*numStories; i < numStories*(pageNum+1); i++) {
      fb.newstories.child(i).once('value', snap => {
        let id = snap.val();

        let itemRef = fb.root.child('item').child(id);
        if (this.newStories.length < numStories*(pageNum+1)) {
          itemRef.once('value', snap => {
            let item = snap.val();
            this.newStories.push(item);
          });
        }
      });
    }
  }
}

const newStories = new NewStories();
export {newStories};