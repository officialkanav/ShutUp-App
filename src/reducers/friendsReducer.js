export const initialState = {
  friends: null,
  reqSent: null,
  reqReceived: null,
  attemptingSearch: false,
  attemptingReqSearch: false,
};

const setFriends = (state, payLoad) => {
  const newState = {...state};
  newState.friends = payLoad;
  newState.attemptingSearch = false;
  return newState;
};

const setReqReceived = (state, payLoad) => {
  const newState = {...state};
  newState.reqReceived = payLoad;
  newState.attemptingReqSearch = false;
  return newState;
};

const logoutUser = () => {
  return {
    friends: null,
    reqSent: null,
    reqReceived: null,
    attemptingSearch: false,
    attemptingReqSearch: false,
  };
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_FRIENDS':
      return setFriends(state, action.payLoad);
    case 'GET_REQ_RECEIVED':
      return setReqReceived(state, action.payLoad);
    case 'ATTEMPTING_SEARCH':
      return {...state, attemptingSearch: true};
    case 'SEARCH_COMPLETE':
      return {...state, attemptingSearch: false};
    case 'ATTEMPTING_REQ_SEARCH':
      return {...state, attemptingReqSearch: true};
    case 'REQ_SEARCH_COMPLETE':
      return {...state, attemptingReqSearch: false};
    case 'REFRESH':
      return logoutUser();
    case 'LOGOUT_USER':
      return logoutUser();
  }
  return state;
}
