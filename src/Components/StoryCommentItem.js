import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as utils from '../utils/utils';
import * as styles from '../utils/styles';

class StoryCommentItem extends Component {

  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  
  render() {
    const comment = this.props.comment.data;

    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <div className='StoryCommentItem' key={comment.id} style={{marginLeft: (comment.level * 8) +'px', marginTop: 10+'px', color: '#646464', fontSize: '14px'}}>
          <Link to={utils.generateUserLink(comment.by)} style={styles.styleLink}>{comment.by}</Link> { ' ' }
          {utils.getTimeSinceSubmission(comment.time)} ago { ' ' } <br/>
          <span style={styles.styleCommentText}>{utils.renderHTML(comment.text)}</span>
        </div>
      )
    }
    return (
      <div className='StoryCommentItem' key={comment.id} style={{marginLeft: (comment.level * 50) +'px', marginTop: 15+'px', color: '#646464', fontSize: '14px'}}>
        <Link to={utils.generateUserLink(comment.by)} style={styles.styleLink}>{comment.by}</Link> { ' ' }
        {utils.getTimeSinceSubmission(comment.time)} ago { ' ' } <br/>
        <span style={styles.styleCommentText}>{utils.renderHTML(comment.text)}</span>
      </div>
    )
  }
}

export default StoryCommentItem;