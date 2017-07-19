import React, {Component} from 'react';
import { Link  } from 'react-router-dom';

class Header extends Component {
  render() {
    const styleHeader = {
      backgroundColor: '#FD6803',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '10px',
    };
    const styleLink = {
      textDecoration: 'none',
      color: 'black'
    }
    return (
      <div style={styleHeader} className="Header">
        <Link to="/" style={styleLink}><strong>Hacker News</strong></Link> | { ' ' }
        <Link to="/new" style={styleLink}>New</Link> | { ' ' }
        <Link to="/best" style={styleLink}>Best</Link> | { ' ' }
        <Link to="/comments" style={styleLink}>Comments</Link> | { ' ' }
        <Link to="/show" style={styleLink}>Show</Link> | { ' ' }
        <Link to="/ask" style={styleLink}>Ask</Link> | { ' ' }
        <Link to="/jobs" style={styleLink}>Jobs</Link>     
      </div>
    )
  }
}

export default Header;