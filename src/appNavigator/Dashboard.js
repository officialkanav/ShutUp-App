/* eslint-disable no-shadow */
import React from 'react';
import {BackHandler} from 'react-native';
import colors from '../utils/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatList from '../views/Dashboard/ChatList';
import SendReq from '../views/Dashboard/SendReq';
import ViewReq from '../views/Dashboard/ViewReq';
import io from 'socket.io-client';
import constants from '../utils/constants';
import {connect} from 'react-redux';
import {addFriend, reqReceivedSingle} from '../actions/friendsAction';

const Tab = createBottomTabNavigator();

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    const {addFriend, reqReceivedSingle} = props;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.socket = io(constants.server, {});
    this.socket.emit('join', props.username);
    this.socket.on('request_accepted', friendObject => {
      addFriend(friendObject, false);
    });
    this.socket.on('request_received', user => {
      reqReceivedSingle(user);
    });
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    return true;
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
          style: {backgroundColor: colors.white, borderTopWidth: 0, height: 70},
          activeTintColor: colors.black,
          inactiveTintColor: colors.gray,
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
    reqReceivedSingle: payLoad => dispatch(reqReceivedSingle(payLoad)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
