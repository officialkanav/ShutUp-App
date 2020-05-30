import constants from '../utils/constants';
import Toast from 'react-native-simple-toast';

export function logout() {
  return {type: 'LOGOUT_USER'};
}

export function addFriend(user, isReqAccepted) {
  return {type: 'ADD_FRIEND', payLoad: {user, isReqAccepted}};
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

export function setReqReceived(payLoad) {
  return {type: 'GET_REQ_RECEIVED', payLoad};
}

export function reqReceivedSingle(payLoad) {
  return {type: 'REQ_RECIEVED_SINGLE', payLoad};
}

export function getReqReceived(token) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_REQ_SEARCH'});
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
        return dispatch(setReqReceived(json));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
        return dispatch({type: 'REQ_SEARCH_COMPLETE'});
      });
  };
}

export function setReqSent(payLoad) {
  return {type: 'GET_REQ_SENT', payLoad};
}

export function getReqSent(token) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_REQ_SENT_SEARCH'});
    return fetch(constants.server.concat('/users/sentRequests'), {
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
        return dispatch(setReqSent(json));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
        return dispatch({type: 'REQ_SENT_SEARCH_COMPLETE'});
      });
  };
}

export function acceptReqOffline(userObject) {
  return {type: 'ACCEPT_REQ', payLoad: userObject};
}

export function acceptReq(token, userObject) {
  const auth = 'Bearer '.concat(token);
  const username = userObject.username;
  return function(dispatch) {
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
        // return dispatch(getReqReceived(token));
        return dispatch(acceptReqOffline(userObject));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
      });
  };
}

export function rejectReqOffline(userObject) {
  return {type: 'REJECT_REQ', payLoad: userObject};
}

export function rejectReq(token, userObject) {
  const auth = 'Bearer '.concat(token);
  const username = userObject.username;
  return function(dispatch) {
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
        // return dispatch(getReqReceived(token));
        return dispatch(rejectReqOffline(userObject));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
      });
  };
}

export function sendReq(token, username) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    return fetch(constants.server.concat('/sendRequest'), {
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
        Toast.show('Request sent', Toast.SHORT);
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
      });
  };
}

export function searchUser(token, username, callback) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    return fetch(constants.server.concat('/users/searchUser'), {
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
        callback(false, json);
      })
      .catch(err => {
        if (err.message !== 'No user found') {
          Toast.show(JSON.stringify(err.message), Toast.SHORT);
        }
        if (err.message === 'Please authenticate properly') {
          return dispatch(logout());
        }
        callback(true, null);
      });
  };
}

export function refresh() {
  return {type: 'REFRESH'};
}
