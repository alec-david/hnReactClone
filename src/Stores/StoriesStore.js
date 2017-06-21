import { observable, computed, toJS } from 'mobx';
import { fb } from '../Firebase/firebaseService';

let numStories = 30;

class Stories {
  pageNum = -1;
  type;

  @observable stories = [];

  constructor(type) {
    this.type = type;
    this.getStoriesForNextPage();
  }

  @computed get json() {
    return toJS(this.stories);
  };

  getStoriesForNextPage() {
    this.pageNum++;
    for (var i = this.pageNum*numStories; i < numStories*(this.pageNum+1); i++) {
      fb.root.child(this.type+'stories').child(i).once('value', snap => {
        let id = snap.val();

        let itemRef = fb.root.child('item').child(id);
        if (this.stories.length < numStories*(this.pageNum+1)) {
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
const ask = new Stories('ask');
//const jobs = new Stories('job');
const show = new Stories('show');
export {topstories, newstories, beststories, ask, show};
//export {topstories, newstories, beststories, ask, jobs, show};