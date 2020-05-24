import React from 'react';
import colors from '../utils/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatList from '../views/Dashboard/ChatList';
import SendReq from '../views/Dashboard/SendReq';
import ViewReq from '../views/Dashboard/ViewReq';
import io from 'socket.io-client';
import constants from '../utils/constants';
import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.socket = io(constants.server, {});
    this.socket.emit('join', props.username);
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
