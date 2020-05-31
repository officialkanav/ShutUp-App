export const initialState = {attemptingChatSearch: false, onFocus: null};

const downloadChat = (state, payLoad) => {
  const newState = payLoad;
  newState.attemptingChatSearch = false;
  return newState;
};

const addChat = (state, payLoad) => {
  const newState = {...state};
  const {username, messageObject} = payLoad;
  if (!newState[username]) {
    newState[username] = [];
    newState[username].push(messageObject);
  } else {
    newState[username] = [messageObject, ...newState[username]];
  }
  newState.attemptingChatSearch = false;
  return newState;
};

const removeTopChat = (state, username) => {
  const newState = {...state};
  if (newState[username]) {
    newState[username].shift();
    newState[username] = [...newState[username]];
  }
  return newState;
};

const logout = state => {
  return {attemptingChatSearch: false};
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CHAT':
      return addChat(state, action.payLoad);
    case 'LOGOUT_USER':
      return logout();
    case 'DOWNLOAD_CHAT':
      return downloadChat(state, action.payLoad);
    case 'ATTEMPTING_CHAT_SEARCH':
      return {...state, attemptingChatSearch: true};
    case 'CHAT_SEARCH_COMPLETE':
      return {...state, attemptingChatSearch: false};
    case 'REMOVE_TOP_CHAT':
      return removeTopChat(state, action.payLoad);
    case 'SET_FOCUS':
      return {...state, onFocus: action.payLoad};
    case 'REMOVE_FOCUS':
      return {...state, onFocus: null};
  }
  return state;
}
