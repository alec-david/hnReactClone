import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import * as styles from '../styles';

class Header extends Component {
  render() {
    return (
      <div style={styles.styleHeader} className="Header">
        <Link to="/" style={styles.styleHeaderText}><strong>Hacker News</strong></Link> | { ' ' }
        <Link to="/new" style={styles.styleHeaderText}>New</Link> | { ' ' }
        <Link to="/best" style={styles.styleHeaderText}>Best</Link> | { ' ' }
        <Link to="/comments" style={styles.styleHeaderText}>Comments</Link> | { ' ' }
        <Link to="/show" style={styles.styleHeaderText}>Show</Link> | { ' ' }
        <Link to="/ask" style={styles.styleHeaderText}>Ask</Link> | { ' ' }
        <Link to="/jobs" style={styles.styleHeaderText}>Jobs</Link>     
      </div>
    )
  }
}

export default Header;