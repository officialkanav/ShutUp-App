import constants from '../utils/constants';
import Toast from 'react-native-simple-toast';
import {setChat} from '../actions/chatAction';
import {setReqReceived, setFriends, setReqSent} from '../actions/friendsAction';

export function login(payLoad) {
  return {
    type: 'LOGIN_USER',
    payLoad,
  };
}

export function logout() {
  return {
    type: 'LOGOUT_USER',
  };
}

export function loginAsync(username, password) {
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_LOGIN'});
    return fetch(constants.server.concat('/users/login'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.err) {
          throw new Error(json.err);
        }
        const payLoad = {
          username: json.user.username.toString(),
          name: json.user.name,
          friends: json.user.friends,
          reqSent: json.user.reqSent,
          reqReceived: json.user.reqReceived,
          token: json.token,
        };
        // dispatch(setChat(json.chats));
        dispatch(setFriends(json.user.friends));
        dispatch(setReqReceived(json.user.reqReceived));
        dispatch(setReqSent(json.user.reqSent));

        return dispatch(login(payLoad));
      })
      .catch(err => {
        // alert(err);
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        return dispatch(logout());
      });
  };
}

export function SignUpAsync(name, username, password) {
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_LOGIN'});
    return fetch(constants.server.concat('/users/createUser'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.err) {
          throw new Error(json.err);
        }
        const payLoad = {
          username: json.user.username,
          name: json.user.name,
          friends: json.user.friends,
          reqSent: json.user.reqSent,
          reqReceived: json.user.reqReceived,
          token: json.token,
        };
        return dispatch(login(payLoad));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        return dispatch(logout());
      });
  };
}

export function authenticateToken(token) {
  const auth = 'Bearer '.concat(token);
  return function(dispatch) {
    dispatch({type: 'ATTEMPTING_LOGIN'});
    return fetch(constants.server.concat('/users/me'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.err) {
          throw new Error(json.err);
        }
        const payLoad = {
          username: json.user.username,
          name: json.user.name,
          friends: json.user.friends,
          reqSent: json.user.reqSent,
          reqReceived: json.user.reqReceived,
          token: token,
        };
        dispatch(setFriends(json.user.friends));
        dispatch(setReqReceived(json.user.pendingRequests));
        dispatch(setReqSent(json.user.sentRequests));

        return dispatch(login(payLoad));
      })
      .catch(err => {
        Toast.show(JSON.stringify(err.message), Toast.SHORT);
        return dispatch(logout());
      });
  };
}
