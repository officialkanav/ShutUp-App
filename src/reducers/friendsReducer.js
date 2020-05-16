export const initialState = {
  friends: null,
  reqSent: null,
  reqReceived: null,
  attemptingSearch: false,
};

const setFriends = (state, payLoad) => {
  const newState = {...state};
  newState.friends = payLoad;
  newState.attemptingSearch = false;
  return newState;
};

const setReqRecieved = (state, payLoad) => {
  const newState = {...state};
  newState.reqReceived = payLoad;
  newState.attemptingSearch = false;
  return newState;
};

const logoutUser = () => {
  return {
    friends: null,
    reqSent: null,
    reqReceived: null,
    attemptingSearch: false,
  };
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_FRIENDS':
      return setFriends(state, action.payLoad);
    case 'GET_REQ_RECIEVED':
      return setReqRecieved(state, action.payLoad);
    case 'ATTEMPTING_SEARCH':
      return {...state, attemptingSearch: true};
    case 'SEARCH_COMPLETE':
      return {...state, attemptingSearch: false};
    case 'REFRESH':
      return logoutUser();
    case 'LOGOUT_USER':
      return logoutUser();
  }
  return state;
}
