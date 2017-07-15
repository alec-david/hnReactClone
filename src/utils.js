import React from 'react';
import { Link } from 'react-router-dom';

/*contains functions used across all of the story and comment item components*/

export function checkURL(story) {
  if (!story.url) {
    return (
      <Link to={this.generateStoryIdLink(story.id)}><strong>{story.title}</strong></Link>
    );
  } else {
    return (
      <a href={story.url}><strong>{story.title}</strong></a>
    );
  }
}

export function simplifyURL(urlStr) {
  let expression = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  let regex = new RegExp(expression);
  if (urlStr === undefined) {
    return '';
  }
  urlStr = urlStr.match(regex);
  return '(' + urlStr[1] + ')';
}

export function getTimeSinceSubmission(submissionTime) {
  const timeDiff = Math.round(new Date().getTime()/1000.0) - submissionTime;

  const hours = timeDiff/3600;
  if (hours >= 1 && hours < 2) {
    return Math.floor(hours) + ' hour';
  } else if (hours >= 2 && hours < 24) {
    return Math.floor(hours) + ' hours';
  } else if (hours >= 24 && hours < 48) {
    return Math.floor(hours/24) + ' day';
  } else if (hours >= 48) {
    return Math.floor(hours/24) + ' days';
  } else {
    const minutes = Math.round(timeDiff/60);
    if (minutes === 1) {
      return minutes + ' minute'
    }
    return minutes + ' minutes';
  }
}

export function generateStoryIdLink(id) {
  return '/story/'+id;
}

export function generateUserLink(userName) {
  return '/user/'+userName;
}

export function renderHTML(str) {
  let txt = document.createElement('textarea');
  txt.innerHTML = str;
  str = txt.value;
  if (str) {
    return str.replace(/<[^>]*>/g, '');
  }
  return '';
}