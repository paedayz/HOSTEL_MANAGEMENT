import {combineReducers} from 'redux'

// Reducers
import userReducer from './userReducer'
import dataReducer from './dataReducer'

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer
  });

export default reducers