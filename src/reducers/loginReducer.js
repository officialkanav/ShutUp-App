export const initialState = {
  _id: null,
  username: null,
  name: null,
  friends: null,
  reqSent: null,
  reqReceived: null,
  token: null,
  attemptingLogin: false,
};

const loginUser = (state, payLoad) => {
  const newState = {...state};
  newState._id = payLoad._id;
  newState.username = payLoad.username;
  newState.name = payLoad.name;
  newState.token = payLoad.token;
  newState.friends = payLoad.friends;
  newState.reqSent = payLoad.reqSent;
  newState.reqReceived = payLoad.reqReceived;
  newState.attemptingLogin = false;
  return newState;
};

const logoutUser = () => {
  return {
    _id: null,
    username: null,
    name: null,
    friends: null,
    reqSent: null,
    reqReceived: null,
    token: null,
    attemptingLogin: false,
  };
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return loginUser(state, action.payLoad);
    case 'LOGOUT_USER':
      return logoutUser();
    case 'ATTEMPTING_LOGIN':
      return {...state, attemptingLogin: true};
    case 'LOGIN_COMPLETE':
      return {...state, attemptingLogin: false};
  }
  return state;
}
