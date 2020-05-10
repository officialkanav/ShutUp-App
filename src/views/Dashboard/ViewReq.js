/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';
import ChatListComponent from './ChatListComponent';

const data = [
  {name: 'Kanav', username: 'officialkanav'},
  {name: 'Madhav', username: 'saand'},
  {name: 'Kanav', username: 'officialkanav'},
  {name: 'Madhav', username: 'saand'},
  {name: 'Kanav', username: 'officialkanav'},
  {name: 'Madhav', username: 'saand'},
  {name: 'Kanav', username: 'officialkanav'},
  {name: 'Madhav', username: 'saand'},
];
export default class ViewReq extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderUser = item => {
    return (
      <ChatListComponent
        name={item.name}
        username={item.username}
        onPress={() => {}}
      />
    );
  };

  renderUserNotFound = () => {
    return (
      <GenericText
        text={'No user found, try again!'}
        size={20}
        color={colors.lightGray}
        style={{marginTop: 80}}
      />
    );
  };

  renderFriendList = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={({item}) => {
          return this.renderUser(item);
        }}
      />
    );
  };

  render() {
    return <View style={styles.container}>{this.renderFriendList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
  },
});

ViewReq.propTypes = {};
