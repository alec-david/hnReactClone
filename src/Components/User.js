import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UserItem from './UserItem';
import UserStore from '../Stores/UserStore';

@observer
class User extends Component {

  constructor() {
    super();
    this.state = {
      userStore: ''
    }
  }

  componentWillMount() {
    let username = this.props.match.params.username;
    let userStore = new UserStore(username);
    this.setState( {
      userStore: userStore
    })
  }

  generateUserInfo() {
    const user = this.state.userStore.json;
    if (user !== undefined) {
      return <UserItem user={user.data} />
    }
    return <div>Loading user information...</div>
  }

  render() {
    const user = this.generateUserInfo();
    return ( 
      <div>
        {user}
      </div>
    )
  }
}

export default User;