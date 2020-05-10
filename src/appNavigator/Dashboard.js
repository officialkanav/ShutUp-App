/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import colors from '../utils/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatList from '../views/Dashboard/ChatList';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
      }}
    />
  );
}

export default class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: 18,
            fontWeight: '500',
          },
          style: {backgroundColor: colors.blue, borderTopWidth: 0, height: 70},
          activeTintColor: colors.lightGray,
          inactiveTintColor: colors.darkGray,
        }}>
        <Tab.Screen name="Chat" component={ChatList} />
        <Tab.Screen name="Search" component={HomeScreen} />
      </Tab.Navigator>
    );
  }
}
