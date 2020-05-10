/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import colors from '../utils/colors';
import GenericText from '../utils/GenericText';
import CircleLogo from '../views/CircleLogo';

const SCREEN_WIDTH = Dimensions.get('window').width;
let chatArray = [
  {text: 'egrjbwjfskjbjkbdvsdvsdvsdsvsbgwe 1', sender: 'me'},
  {text: 'sdvsdvs 2', sender: 'friend'},
  {text: 'dfbdfbdfbsdfb 3', sender: 'me'},
  {text: 'sdvsdvs 4', sender: 'friend'},
  {text: 'fsbdfdf 5', sender: 'me'},
  {text: 'sdvsdvs 6', sender: 'friend'},
  {text: 'gfgnfgnfrg 7', sender: 'me'},
  {text: 'sdvsdvs 8', sender: 'friend'},
  {text: 'egrjbwjfsdvsdvsdvsdsvsbgwe 9', sender: 'me'},
  {text: 'sdvsdvs 10', sender: 'friend'},
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
          byMe && {marginLeft: 0.36 * SCREEN_WIDTH},
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
    const newChat = this.state.newChat;
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{
          flexDirection: 'row',
          flex: 0.1,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
            onPress={() => {
              newChat !== '' &&
                chatArray.unshift({text: newChat, sender: 'Me'});
              this.setState({newChat: ''});
            }}
            textSize={7}
          />
        </View>
      </KeyboardAvoidingView>
    );
  };

  renderFlatList = () => {
    // const data = chatArray.reverse()
    return (
      <FlatList
        extraData={chatArray}
        inverted
        keyExtractor={(item, index) => index.toString()}
        data={chatArray}
        renderItem={({item}) => {
          return this.renderChats(item);
        }}
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
