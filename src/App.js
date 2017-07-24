import React, {Component} from 'react';
import Header from './Components/Header';
import routes from './routes';
import * as styles from './styles';

class App extends Component {

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
    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <div className="App">
          <Header />
          {routes}  
        </div>
      )
    }
    return (
      <div className="App" style={styles.styleWebPadding}>
        <Header />
        {routes}  
      </div>
    )
  }
}

export default App;
