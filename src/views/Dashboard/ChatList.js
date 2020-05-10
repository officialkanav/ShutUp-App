/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
// import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import ChatListComponent from './ChatListComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DATA = [
  {
    name: 'Kanav',
    username: 'officialkanav',
  },
  {
    name: 'Kanav',
    username: 'officialkanav',
  },
  {
    name: 'Kanav',
    username: 'officialkanav',
  },
  {
    name: 'Kanav',
    username: 'officialkanav',
  },
  {
    name: 'Kanav',
    username: 'officialkanav',
  },
];

export default class ChatList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  cardOnPress = (username, name) => {
    this.props.navigation.navigate('ChattingScreen', {
      friend: {username, name},
    });
  };

  renderChatCard = (username, name) => {
    return (
      <ChatListComponent
        username={username}
        name={name}
        onPress={this.cardOnPress}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={DATA}
          renderItem={({item}) => {
            return this.renderChatCard(item.username, item.name);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
  },
  chatCardContainer: {
    height: 60,
    width: SCREEN_WIDTH - 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginTop: 5,
    alignItems: 'center',
  },
});

ChatList.propTypes = {};
