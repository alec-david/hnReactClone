import React, {Component} from 'react';
import { Route, Link  } from 'react-router-dom';
import { topstories, newstories, beststories, ask, show } from './Stores/StoriesStore';

import { newcomments } from './Stores/NewCommentsStore';

import Jobs from './Components/Jobs';
import NewComments from './Components/NewComments';
import Stories from './Components/Stories';
import StoryComments from './Components/StoryComments';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/">Hacker News</Link> | { ' ' }
        <Link to="/new">New</Link> | { ' ' }
        <Link to="/best">Best</Link> | { ' ' }
        <Link to="/comments">Comments</Link> | { ' ' }
        <Link to="/show">Show</Link> | { ' ' }
        <Link to="/ask">Ask</Link> | { ' ' }
        <Link to="/jobs">Jobs</Link>
        
        <hr/>

        {/*<Route exact path="/" render={()=><Stories store={this.store} />}/>*/}
        <Route exact path="/" render={()=><Stories stories={topstories} />}/>
        <Route path="/new" render={()=><Stories stories={newstories} />}/>
        <Route path="/best" render={()=><Stories stories={beststories} />}/>
        <Route path="/comments" render={()=><NewComments comments={newcomments} />}/>
        <Route path="/show" render={()=><Stories stories={show} />}/>
        <Route path="/ask" render={()=><Stories stories={ask} />}/>
        <Route path="/jobs" component={Jobs}/>
        <Route path="/story/:id" component={StoryComments}/>
        {/*<Route path="/job/:id" component={}/>*/}
      
      </div>
    )
  }
}

export default App;
