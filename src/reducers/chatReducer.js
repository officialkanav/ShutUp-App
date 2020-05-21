export const initialState = {};

const addChat = (state, payLoad) => {
  const newState = {...state};
  const {friendUsername, message} = payLoad;
  if (!newState[friendUsername]) {
    newState[friendUsername] = [];
  }
  newState[friendUsername].unshift(message);
  return newState;
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_CHAT':
      return addChat(state, action.payLoad);
  }
  return state;
}
