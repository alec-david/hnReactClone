import { observable, computed, toJS } from 'mobx';
import axios from 'axios';

let numStories = 30;
let fbURL = 'https://hacker-news.firebaseio.com/v0/';
let fbURLItem = fbURL + 'item/';

class Stories {
  pageNum = 0;
  type;
  initStories;

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
  }

  getStoriesForNextPage() {
    this.pageNum++;
    this.initStories.data.slice(this.pageNum*numStories,(this.pageNum+1)*numStories).map(item => {
      axios
        .get(fbURLItem + item + '.json')
        .then(story => {
          this.stories.push(story)
        })
    })
  }
}

const topstories = new Stories('top');
const newstories = new Stories('new');
const beststories = new Stories('best');
const ask = new Stories('ask');
const jobs = new Stories('job');
const show = new Stories('show');
export {topstories, newstories, beststories, ask, jobs, show};