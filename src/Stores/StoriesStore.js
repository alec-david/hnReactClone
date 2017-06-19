import { observable, computed, toJS } from 'mobx';
import { fb } from '../Firebase/firebaseService';

let pageNum = -1;
let numStories = 30;

class Stories {
  @observable stories = [];

  constructor(type) {
    this.getStoriesForNextPage(type);
  }

  @computed get json() {
    return toJS(this.stories);
  };

  getStoriesForNextPage(type) {
    pageNum++;
    for (var i = pageNum*numStories; i < numStories*(pageNum+1); i++) {
      fb.root.child(type+'stories').child(i).once('value', snap => {
        let id = snap.val();

        let itemRef = fb.root.child('item').child(id);
        if (this.stories.length < numStories*(pageNum+1)) {
          itemRef.once('value', snap => {
            let item = snap.val();
            this.stories.push(item);
          });
        }
      });
    }
  }
}

const topstories = new Stories('top');
const newstories = new Stories('new');
const beststories = new Stories('best');
export {topstories, newstories, beststories};