import { observable, computed, toJS } from 'mobx';
import axios from 'axios';

const numStories = 30;
const fbURL = 'https://hacker-news.firebaseio.com/v0/';
const fbURLItem = fbURL + 'item/';

class StoriesStore {
  pageNum = 0;
  type;
  initStories;
  storyIndex = 0;

  @observable stories = [];

  constructor(type) {
    this.type = type;
    this.loadInitialStories();
  }

  @computed get json() {
    return toJS(this.stories);
  };

  loadInitialStories() {
    axios
      .get(fbURL + this.type + 'stories.json')
      .then(storyIds => {
        this.initStories = storyIds;
        storyIds.data.slice(0,numStories).map(item => {
          axios
            .get(fbURLItem + item + '.json')
            .then(story => {
              this.stories.push(story)
            })
        })
      })
    this.storyIndex = numStories;
  }

  getStoriesForNextPage() {
    this.pageNum++;
    this.initStories.data.slice(this.storyIndex,this.storyIndex+numStories).map(item => {
      axios
        .get(fbURLItem + item + '.json')
        .then(story => {
          this.stories.push(story)
        })
    })
    this.storyIndex += numStories;
  }

  removeStoryItem(storyId) {
    let index;
    for (var i = 0; i < this.stories.length; i++) {
      if (storyId === this.stories[i].data.id) {
        index = i;
        break;
      }
    }
    this.stories.splice(index,1);
    this.loadNextStoryItem();
  }

  loadNextStoryItem() {
    let item = this.initStories.data[this.storyIndex++];
    axios
      .get(fbURLItem + item + '.json')
      .then(story => {
        this.stories.push(story);
      })
  }
}

export default StoriesStore;