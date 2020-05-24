import constants from '../utils/constants';

export function addChat(message) {
  return {type: 'ADD_CHAT', payLoad: message};
}

export function logout() {
  return {type: 'LOGOUT_USER'};
}

function setChat(payLoad) {
  return {type: 'DOWNLOAD_CHAT', payLoad};
}

export function getChats(token) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_CHAT_SEARCH'});
    return fetch(constants.server.concat('/users/chats'), {
      method: 'GET',
      headers: {
        // eslint-disable-next-line prettier/prettier
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': auth,
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.err) {
          throw new Error(json.err);
        }
        return dispatch(setChat(json));
      })
      .catch(err => {
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
        return dispatch({type: 'CHAT_SEARCH_COMPLETE'});
      });
  };
}
