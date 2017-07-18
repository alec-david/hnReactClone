import React, {Component} from 'react';
import { Link  } from 'react-router-dom';

class Header extends Component {
  render() {
    const style = {
      backgroundColor: 'orange',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '200px'
    };
    return (
      <div style={style} className="Header">
        <Link to="/"><strong>Hacker News</strong></Link> | { ' ' }
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