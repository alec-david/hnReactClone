import { observable, computed, toJS } from 'mobx';
import { fb } from '../Firebase/firebaseService';

let numComments = 30;

class NewComments {
  pageNum = -1;

  @observable comments = [];

  constructor() {
    this.getNewComments();
  }

  @computed get json() {
    return toJS(this.comments);
  };

  getNewComments() {
    this.pageNum++;
    fb.root.child('maxitem').once('value', snap => {
      console.log(snap.val());
      let maxId = snap.val();
      for (var i = this.pageNum*numComments; i < numComments*(this.pageNum+1); i++) {
        let itemRef = fb.root.child('item').child(maxId);
        itemRef.once('value', snap => {
          let item = snap.val();
          if (item.type === 'comment') {
            this.comments.push(item);
            let parentRef = fb.root.child('item').child(item.parent);
            console.log(item.parent);
            parentRef.once('value', snapshot => {
              console.log(snapshot.val());
            })
          } else {
            i--;
            console.log(i);
          }
        });
        maxId--;
      }
    })
  }
}


const newcomments = new NewComments();
export {newcomments};