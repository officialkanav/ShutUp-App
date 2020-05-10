import React from 'react';
import colors from '../utils/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartPage from '../views/Startpage';
import Login from '../views/Login';
import Dashboard from './Dashboard';
import ChatScreen from '../views/ChatScreen';

const Stack = createStackNavigator();

export default class AppNavigator extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
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
              headerBackTitle: null,
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
