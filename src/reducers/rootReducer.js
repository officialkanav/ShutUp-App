import {combineReducers} from 'redux';
import Login from './loginReducer';
import FriendReducer from './friendsReducer';
import ChatReducer from './chatReducer';

export default combineReducers({
  Login,
  Friends: FriendReducer,
  Chats: ChatReducer,
});
