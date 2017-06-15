import { observable, computed, toJS } from 'mobx';
import { fb } from '../Firebase/firebaseService';

let pageNum = -1;
let numStories = 30;

class BestStories {
  @observable bestStories = [];

  constructor() {
    this.getStoriesForNextPage();
  }

  @computed get json() {
    return toJS(this.bestStories);
  };

  getStoriesForNextPage() {
    pageNum++;
    for (var i = pageNum*numStories; i < numStories*(pageNum+1); i++) {
      fb.beststories.child(i).once('value', snap => {
        let id = snap.val();

        let itemRef = fb.root.child('item').child(id);
        if (this.bestStories.length < numStories*(pageNum+1)) {
          itemRef.once('value', snap => {
            let item = snap.val();
            this.bestStories.push(item);
          });
        }
      });
    }
  }
}

const bestStories = new BestStories();
export {bestStories};