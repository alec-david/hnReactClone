import React from 'react';
import { Route  } from 'react-router-dom';
import * as styles from './styles';

import Jobs from '../components/Jobs';
import NewComments from '../components/NewComments';
import Stories from '../components/Stories';
import StoryComments from '../components/StoryComments';
import User from '../components/User';

const routes = (
  <div className="Routes" style={styles.styleApp}>
    <Route exact path="/" render={()=><Stories type='top' />}/>
    <Route path="/new" render={()=><Stories type='new' />}/>
    <Route path="/best" render={()=><Stories type='best' />}/>
    <Route path="/comments" component={NewComments}/>
    <Route path="/show" render={()=><Stories type='show' />}/>
    <Route path="/ask" render={()=><Stories type='ask' />}/>
    <Route path="/jobs" component={Jobs}/>
    <Route path="/story/:id" component={StoryComments}/>
    <Route path="/user/:username" component={User}/>
  </div>
)

export default routes;