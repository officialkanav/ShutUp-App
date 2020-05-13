export const initialSettings = {
  username: null,
  name: null,
  token: null,
};

const loginUser = (state, payLoad) => {
  const newState = {...state};
  newState.username = payLoad.username;
  newState.name = payLoad.name;
  newState.token = payLoad.token;
  return newState;
};

const checkIfLoggedIn = (state, payLoad) => {
  return null;
};

const logoutUser = () => {
  return {
    username: null,
    name: null,
    token: null,
  };
};
export default function saveReducer(state = initialSettings, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return loginUser(state, action.payLoad);
    case 'CHECK_IF_LOGGED_IN':
      return checkIfLoggedIn(state, action.payLoad);
    case 'LOGOUT_USER':
      return logoutUser();
  }
  return state;
}
