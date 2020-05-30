/* eslint-disable no-shadow */
import React from 'react';
import colors from '../utils/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatList from '../views/Dashboard/ChatList';
import SendReq from '../views/Dashboard/SendReq';
import ViewReq from '../views/Dashboard/ViewReq';
import io from 'socket.io-client';
import constants from '../utils/constants';
import {connect} from 'react-redux';
import {addFriend} from '../actions/friendsAction';

const Tab = createBottomTabNavigator();

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    const {addFriend} = props;
    this.socket = io(constants.server, {});
    this.socket.emit('join', props.username);
    this.socket.on('request_accepted', friendObject => {
      addFriend(friendObject, false);
    });
  }

  render() {
    return (
      <Tab.Navigator
        screenProps={{socket: this.socket}}
        tabBarOptions={{
          labelStyle: {
            fontSize: 18,
            fontWeight: '500',
          },
          style: {backgroundColor: colors.blue, borderTopWidth: 0, height: 70},
          activeTintColor: colors.lightGray,
          inactiveTintColor: colors.darkGray,
        }}>
        <Tab.Screen name="Chat">
          {props => <ChatList {...props} socket={this.socket} />}
        </Tab.Screen>
        <Tab.Screen name="Search">
          {props => <SendReq {...props} socket={this.socket} />}
        </Tab.Screen>
        <Tab.Screen name="Requests">
          {props => <ViewReq {...props} socket={this.socket} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.Login.username,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addFriend: (user, isReqAccepted) =>
      dispatch(addFriend(user, isReqAccepted)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
