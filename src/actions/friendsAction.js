import constants from '../utils/constants';
import Toast from 'react-native-simple-toast';

export function logout() {
  return {type: 'LOGOUT_USER'};
}

export function setFriends(payLoad) {
  return {type: 'GET_FRIENDS', payLoad};
}

export function getFriends(token) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_SEARCH'});
    return fetch(constants.server.concat('/users/friends'), {
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
        return dispatch(setFriends(json));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
        return dispatch({type: 'SEARCH_COMPLETE'});
      });
  };
}

export function setReqRecieved(payLoad) {
  return {type: 'GET_REQ_RECIEVED', payLoad};
}

export function getReqRecieved(token) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_SEARCH'});
    return fetch(constants.server.concat('/users/pendingRequests'), {
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
        return dispatch(setReqRecieved(json));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
        return dispatch({type: 'SEARCH_COMPLETE'});
      });
  };
}

export function acceptReq(token, username) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_SEARCH'});
    return fetch(constants.server.concat('/acceptRequest'), {
      method: 'POST',
      headers: {
        // eslint-disable-next-line prettier/prettier
            'Accept': 'application/json',
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
            'Authorization': auth,
      },
      body: JSON.stringify({
        username,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.err) {
          throw new Error(json.err);
        }
        Toast.show('Request Accepted', Toast.SHORT);
        return dispatch(getReqRecieved(token));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
        return dispatch({type: 'SEARCH_COMPLETE'});
      });
  };
}

export function rejectReq(token, username) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_SEARCH'});
    return fetch(constants.server.concat('/rejectRequest'), {
      method: 'POST',
      headers: {
        // eslint-disable-next-line prettier/prettier
              'Accept': 'application/json',
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
              'Authorization': auth,
      },
      body: JSON.stringify({
        username,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.err) {
          throw new Error(json.err);
        }
        Toast.show('Request Rejected', Toast.SHORT);
        return dispatch(getReqRecieved(token));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
        return dispatch({type: 'SEARCH_COMPLETE'});
      });
  };
}
