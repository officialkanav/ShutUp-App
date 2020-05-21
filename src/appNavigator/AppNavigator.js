import React from 'react';
import colors from '../utils/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartPage from '../views/Startpage';
import Login from '../views/Login';
import Dashboard from './Dashboard';
import ChatScreen from '../views/ChatScreen';
import Splash from '../views/Splash';
import {connect} from 'react-redux';
import {addChat} from '../actions/chatAction';
import io from 'socket.io-client';
import constants from '../utils/constants';
import Toast from 'react-native-simple-toast';

const Stack = createStackNavigator();

class AppNavigator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.socket = io(constants.server, {});
    const {username, addChatToReducer} = this.props;
    this.socket.emit('join', username);
    this.socket.on('get_message', messageObject => {
      const message = {
        text: messageObject.message,
        sender: messageObject.fromUser,
      };
      addChatToReducer({friendUsername: message.sender, message});
      // this.setState({chatArray: [message, ...this.state.chatArray]});
    });
    this.socket.on('notOnlineError', () => {
      Toast.show('The user is not online yet', Toast.SHORT);
    });
  }
  componentWillMount() {
    const {username} = this.props;
    this.socket.emit('exit', username);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StartScreen"
            component={StartPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DashboardScreen"
            component={Dashboard}
            options={{
              headerTitle: 'ShutUp',
              headerTintColor: colors.darkGray,
              headerStyle: {backgroundColor: colors.lightGray},
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="ChattingScreen"
            component={ChatScreen}
            options={{
              headerTitle: 'ShutUp',
              headerTintColor: colors.darkGray,
              headerStyle: {backgroundColor: colors.lightGray},
              headerBackTitle: null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.Login,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addChatToReducer: message => dispatch(addChat(message)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNavigator);
