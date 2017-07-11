import React, {Component} from 'react';
import { Link  } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">Hacker News</Link> | { ' ' }
        <Link to="/new">New</Link> | { ' ' }
        <Link to="/best">Best</Link> | { ' ' }
        <Link to="/comments">Comments</Link> | { ' ' }
        <Link to="/show">Show</Link> | { ' ' }
        <Link to="/ask">Ask</Link> | { ' ' }
        <Link to="/jobs">Jobs</Link>     
      </div>
    )
  }
}

export default Header;