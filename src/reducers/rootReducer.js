import {combineReducers} from 'redux';
import Login from './loginReducer';
import FriendReducer from './friendsReducer';

export default combineReducers({Login, Friends: FriendReducer});
