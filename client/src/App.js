import './App.css';
import jwtDecode from "jwt-decode"
import axios from 'axios'

// Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AuthRoute from './utils/AuthRoute'
import AdminRoute from './utils/AdminRoute'

// Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_USER_CREDENTIALS} from './redux/types'
import {logout} from './redux/actions/userAction'

// Page
import Home from './pages/Home'
import Auth from './pages/Auth'
import Booking from './pages/Booking'
import HostelDetail from './pages/HostelDetail'
import MyHostel from './pages/MyHostel'
import Admin from './pages/Admin'
import Profile from './pages/Profile'

// Component
import Sidebar from './component/layout/Sidebar'

let axiosDefaults = require("axios/lib/defaults");
axiosDefaults.baseURL =
  "https://hostel-managements.herokuapp.com/api";

const token = localStorage.UserIdToken;

if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    window.location.href = "/";
    store.dispatch(logout());
  } else {
    store.dispatch({ type: SET_USER_CREDENTIALS, payload: decodeToken.credentials});
    axios.defaults.headers.common["Authorization"] = token;
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Route
            path="/"
            render={(props) => {
              if (props.location.pathname !== "/auth") {
                return <Sidebar />;
              }
            }}
          />
          <Switch>
            <Route exact path="/auth" component={Auth} />
            <AuthRoute exact path="/" component={Home} />
            <AuthRoute exact path="/booking" component={Booking} />
            <AuthRoute exact path="/my_hostel" component={MyHostel} />
            <AdminRoute exact path="/admin" component={Admin} />
            <AdminRoute exact path="/profile" component={Profile} />
            <AuthRoute exact path="/hostel_detail/:hostelId" component={HostelDetail} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
