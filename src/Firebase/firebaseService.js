import firebase from 'firebase';

var config = {
  databaseURL: "https://hacker-news.firebaseio.com/"
};
firebase.initializeApp(config);

const root = firebase.database().ref('v0');

const fb = {
  root,
};

export { fb };