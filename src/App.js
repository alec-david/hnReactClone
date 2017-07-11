import React, {Component} from 'react';
import Header from './Components/Header';
import routes from './routes';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Header />
        <hr/>
        {routes}  
      </div>
    )
  }
}

export default App;
