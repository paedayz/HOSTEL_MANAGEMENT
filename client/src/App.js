import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AuthRoute from './utils/AuthRoute'

// Redux
import {Provider} from 'react-redux'
import store from './redux/store'

// Page
import Home from './pages/Home'
import Auth from './pages/Auth'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <AuthRoute exact path="/" component={Home} />
            <Route exact path="/auth" component={Auth} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
