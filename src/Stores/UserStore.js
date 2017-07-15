import { observable, computed, toJS } from 'mobx';
import axios from 'axios';

const fbURL = 'https://hacker-news.firebaseio.com/v0/';
const fbURLUser = fbURL + 'user/';

class UserStore {

  @observable user;

  constructor(username) {
    this.loadUserInfo(username);
  }

  @computed get json() {
    return toJS(this.user);
  };

  loadUserInfo(username) {
    axios
      .get(fbURLUser + username + '.json')
      .then(userInfo => {
        this.user = userInfo;
      })
  }
}

export default UserStore;