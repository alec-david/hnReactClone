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

  getNewComments(maxId) {
    this.pageNum++;
    fb.root.child('maxitem').once('value', snap => {
      console.log(snap.val());
      let maxId = snap.val();
      // let commentCtr = 0;
      // while (commentCtr<30) {
      //   let itemRef = fb.root.child('item').child(maxId);
      //   itemRef.once('value', snap => {
      //     let item = snap.val();
      //     if (item.type === 'comment') {
      //       this.comments.push(item);
      //       commentCtr++;
      //     }
      //   })
      //   maxId--;
      // }
      // for (var i = this.pageNum*numComments; i < numComments*(this.pageNum+1); i++) {
      //   let itemRef = fb.root.child('item').child(maxId);
      //   itemRef.once('value', snap => {
      //     let item = snap.val();
      //     // console.log(item);
      //     if (item.type === 'comment') {
      //       this.comments.push(item);
      //     } else {
      //       i--;
      //       console.log('asuh');
      //     }
      //   });
      //   maxId--;
      // }
    })
  }
}


const newcomments = new NewComments();
export {newcomments};