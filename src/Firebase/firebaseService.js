import firebase from 'firebase';

var config = {
  databaseURL: "https://hacker-news.firebaseio.com/"
};
firebase.initializeApp(config);

const root = firebase.database().ref('v0');
const topstories = firebase.database().ref('v0/topstories');
const newstories = firebase.database().ref('v0/newstories');
const beststories = firebase.database().ref('v0/beststories');
const ask = firebase.database().ref('v0/askstories');
const show = firebase.database().ref('v0/showstories');
const job = firebase.database().ref('v0/jobstories');

const fb = {
  root,
  topstories,
  newstories,
  beststories,
  ask,
  show,
  job
};

export { fb };