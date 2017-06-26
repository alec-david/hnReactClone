import { observable, computed, toJS } from 'mobx';

class StoryCommentsStore {
  @observable comments = [];

  constructor() {
    //console.log('asuh');
  }

  @computed get json() {
    return toJS(this.stories);
  };

  @computed get testGet() {
    return [1,2,3];
  };
}

const storyCommentsStore = new StoryCommentsStore();
export {storyCommentsStore};