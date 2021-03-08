import {combineReducers} from 'redux'

// Reducers
import userReducer from './userReducer'

const reducers = combineReducers({
    user: userReducer,
  });

export default reducers