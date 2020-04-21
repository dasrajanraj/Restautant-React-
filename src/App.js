import React ,{Component} from 'react';
import Main from './component/MainComponent';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore'

const store = configureStore();

class App extends Component{
  render(){
    return(
      <Provider store = {store}>
        <Router>
          <Main/>
        </Router>
      </Provider>
      
    );
  }
}

export default App;