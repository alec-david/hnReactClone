import React from 'react';
import { Route  } from 'react-router-dom';

import Jobs from './Components/Jobs';
import NewComments from './Components/NewComments';
import Stories from './Components/Stories';
import StoryComments from './Components/StoryComments';
import User from './Components/User';

const style = {
  backgroundColor: '#cfd2d6',
  paddingLeft: '200px'
}

const routes = (
  <div className="Routes" style={style}>
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