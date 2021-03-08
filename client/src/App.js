import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AuthRoute from './utils/AuthRoute'
import jwtDecode from "jwt-decode"
import axios from 'axios'

// Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_USER_CREDENTIALS} from './redux/types'

// Page
import Home from './pages/Home'
import Auth from './pages/Auth'

let axiosDefaults = require("axios/lib/defaults");
axiosDefaults.baseURL =
  "http://localhost:5000/api";

const token = localStorage.UserIdToken;

if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    window.location.href = "/";
    // store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_USER_CREDENTIALS, payload: decodeToken.credentials});
    axios.defaults.headers.common["Authorization"] = token;
    // store.dispatch(getUserData());
  }
}

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
