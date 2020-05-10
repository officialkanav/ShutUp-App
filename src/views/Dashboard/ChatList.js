/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';

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
      <TouchableOpacity
        style={styles.chatCardContainer}
        onPress={() => {
          this.cardOnPress(username, name);
        }}>
        <View
          style={{
            height: 55,
            width: 55,
            borderRadius: 55,
            marginLeft: 5,
            backgroundColor: colors.darkGray,
          }}
        />
        {/* image above */}
        <View>
          <GenericText
            text={name}
            color={colors.darkGray}
            size={30}
            style={{marginLeft: 10}}
          />
          <GenericText
            text={`@${username}`}
            color={colors.darkGray}
            size={10}
            style={{marginLeft: 10}}
          />
        </View>
      </TouchableOpacity>
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
