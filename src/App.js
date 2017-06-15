import React, {Component} from 'react';
import { Route, Link  } from 'react-router-dom';

import Ask from './Components/Ask';
import BestStories from './Components/BestStories';
import Jobs from './Components/Jobs';
import NewComments from './Components/NewComments';
import NewStories from './Components/NewStories';
import Show from './Components/Show';
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

        <Route exact path="/" render={()=><Stories store={this.store} />}/>
        <Route path="/new" component={NewStories}/>
        <Route path="/best" component={BestStories}/>
        <Route path="/comments" component={NewComments}/>
        <Route path="/show" component={Show}/>
        <Route path="/ask" component={Ask}/>
        <Route path="/jobs" component={Jobs}/>
        <Route path="/story/:id" component={StoryComments}/>
        {/*<Route path="/job/:id" component={}/>*/}
        {/*<Page submissions={this.state.submissions} deleteSubmission={this.deleteSubmission.bind(this)} />*/}
      
      </div>
    )
  }
}

export default App;
