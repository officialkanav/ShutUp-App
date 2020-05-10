/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions, FlatList, TextInput} from 'react-native';
import colors from '../utils/colors';
import GenericText from '../utils/GenericText';
import CircleLogo from '../views/CircleLogo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const chatArray = [
  {text: 'egrjbwjfskjbjkbdvsdvsdvsdsvsbgwe', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'dfbdfbdfbsdfb', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'fsbdfdf', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'gfgnfgnfrg', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'egrjbwjfsdvsdvsdvsdsvsbgwe', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'fdsfvsfv', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'mkfbjfosdvh dsufhsdu gwueg iuwiuv ewiufw', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'fsbdfdf', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'gfgnfgnfrg', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'egrjbwjfsdvsdvsdvsdsvsbgwe', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'fdsfvsfv', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'mkfbjfosdvh dsufhsdu gwueg iuwiuv ewiufw', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'fsbdfdf', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'gfgnfgnfrg', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'egrjbwjfsdvsdvsdvsdsvsbgwe', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'fdsfvsfv', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
  {text: 'mkfbjfosdvh dsufhsdu gwueg iuwiuv ewiufw', sender: 'me'},
  {text: 'sdvsdvs', sender: 'friend'},
];

export default class ChatScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newChat: '',
    };
  }

  renderHeader = () => {
    const {
      friend: {username, name},
    } = this.props.route.params;
    return (
      <View style={styles.headerContainer}>
        <View
          style={{
            height: 55,
            width: 55,
            borderRadius: 55,
            backgroundColor: colors.darkGray,
            position: 'absolute',
            left: 5,
          }}
        />
        {/* image above */}
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
          style={{position: 'absolute', right: 5, bottom: 5}}
        />
      </View>
    );
  };

  renderChats = chat => {
    const byMe = chat.sender === 'me';
    const color = byMe ? colors.darkGray : colors.lightGray;
    const textColor = byMe ? colors.lightGray : colors.darkGray;
    return (
      <View
        style={[
          styles.chatContainer,
          {backgroundColor: color},
          byMe && {marginLeft: 0.33 * SCREEN_WIDTH},
        ]}>
        <GenericText
          text={chat.text}
          size={17}
          color={textColor}
          style={{position: 'relative', right: 0}}
        />
      </View>
    );
  };

  renderTextInput = () => {
    return (
      <View style={{flexDirection: 'row', flex: 0.1, margin: 5}}>
        <TextInput
          style={{
            ...styles.textInput,
          }}
          onChangeText={value => {
            this.setState({newChat: value});
          }}
          value={this.state.newChat}
          placeholder={'Type a message'}
        />
        <View style={{marginLeft: 5}}>
          <CircleLogo
            radius={40}
            noAnimation={true}
            onPress={() => {}}
            textSize={7}
          />
        </View>
      </View>
    );
  };

  renderFlatList = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={chatArray}
        renderItem={({item}) => {
          return this.renderChats(item);
        }}
        // ListFooterComponent={this.renderTextInput}
        // contentContainerStyle={{flexGrow: 1}}
        // ListFooterComponentStyle={{flex: 1, justifyContent: 'flex-end'}}
        style={{flex: 0.9, marginTop: 3}}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderFlatList()}
        {this.renderTextInput()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  headerContainer: {
    height: 60,
    width: SCREEN_WIDTH - 6,
    borderRadius: 5,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  chatContainer: {
    width: SCREEN_WIDTH / 1.5,
    borderRadius: 5,
    margin: 3,
    padding: 3,
  },
  textInput: {
    height: 40,
    width: SCREEN_WIDTH - 60,
    backgroundColor: colors.lightGray,
    fontSize: 17,
    borderRadius: 5,
  },
});

ChatScreen.propTypes = {};
