export const initialState = {attemptingChatSearch: false};

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
  }
  return state;
}
