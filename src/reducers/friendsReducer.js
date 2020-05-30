import {compareId} from '../utils/helperFunctions';

export const initialState = {
  friends: null,
  reqSent: null,
  reqReceived: null,
  attemptingFriendsSearch: false,
  attemptingReqReceivedSearch: false,
  attemptingReqSentSearch: false,
};

const addFriend = (state, payLoad, isReqAccepted = false) => {
  const newState = {...state};
  newState.friends = [...newState.friends, payLoad];
  if (isReqAccepted && newState.reqReceived) {
    newState.reqReceived = newState.reqReceived.filter(friend => {
      return friend.username !== payLoad.username;
    });
  } else {
    if (newState.reqSent) {
      newState.reqSent = newState.reqSent.filter(friend => {
        return friend.username !== payLoad.username;
      });
    }
  }
  return newState;
};

const setFriends = (state, payLoad) => {
  const newState = {...state};
  newState.friends = payLoad;
  newState.attemptingFriendsSearch = false;
  return newState;
};

const setReqReceived = (state, payLoad) => {
  const newState = {...state};
  newState.reqReceived = payLoad;
  newState.attemptingReqReceivedSearch = false;
  return newState;
};

const setReqReceivedSingle = (state, payLoad) => {
  const newState = {...state};
  newState.reqReceived = [...newState.reqReceived, payLoad];
  return newState;
};

const setReqSent = (state, payLoad) => {
  const newState = {...state};
  newState.reqSent = payLoad;
  newState.attemptingReqSentSearch = false;
  return newState;
};

const rejectRequestOffline = (state, payLoad) => {
  const newState = {...state};
  if (newState.reqReceived) {
    newState.reqReceived = newState.reqReceived.filter(friend => {
      return friend.username !== payLoad.username;
    });
  }
  return newState;
};

const logoutUser = () => {
  return {
    friends: null,
    reqSent: null,
    reqReceived: null,
    attemptingFriendsSearch: false,
    attemptingReqReceivedSearch: false,
  };
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FRIEND':
      return addFriend(
        state,
        action.payLoad.user,
        action.payLoad.isReqAccepted,
      );
    case 'GET_FRIENDS':
      return setFriends(state, action.payLoad);
    case 'GET_REQ_RECEIVED':
      return setReqReceived(state, action.payLoad);
    case 'REQ_RECIEVED_SINGLE':
      return setReqReceivedSingle(state, action.payLoad);
    case 'GET_REQ_SENT':
      return setReqSent(state, action.payLoad);
    case 'ATTEMPTING_SEARCH':
      return {...state, attemptingFriendsSearch: true};
    case 'ATTEMPTING_REQ_SEARCH':
      return {...state, attemptingReqReceivedSearch: true};
    case 'ATTEMPTING_REQ_SENT_SEARCH':
      return {...state, attemptingReqSentSearch: true};
    case 'REQ_SEARCH_COMPLETE':
      return {...state, attemptingReqReceivedSearch: false};
    case 'REQ_SENT_SEARCH_COMPLETE':
      return {...state, attemptingReqSentSearch: false};
    case 'SEARCH_COMPLETE':
      return {...state, attemptingFriendsSearch: false};
    case 'ACCEPT_REQ':
      return addFriend(state, action.payLoad, true);
    case 'REJECT_REQ':
      return rejectRequestOffline(state, action.payLoad);
    case 'REFRESH':
      return logoutUser();
    case 'LOGOUT_USER':
      return logoutUser();
  }
  return state;
}
