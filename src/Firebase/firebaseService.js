import firebase from 'firebase';

var config = {
  databaseURL: "https://hacker-news.firebaseio.com/"
};
firebase.initializeApp(config);

const root = firebase.database().ref('v0');
const topstories = firebase.database().ref('v0/topstories');

const fb = {
  root,
  topstories
};

export { fb };