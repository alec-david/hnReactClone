import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils';

class UserItem extends Component {

  formatAbout(user) {
    if (user.about) {
      return utils.renderHTML(user.about);
    }
    return '';
  }

  render() {
    const user = this.props.user;
    return (
      <div>
        User: { ' ' } <Link to={utils.generateUserLink(user.id)}>{user.id}</Link>
        <br/><br/>
        Created: { ' ' } {utils.getTimeSinceSubmission(user.created)} ago
        <br/><br/>
        Karma: { ' ' } {user.karma}
        <br/><br/>
        About: {this.formatAbout(user)}
      </div>
    )
  }

}

export default UserItem;