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
import io from 'socket.io-client';
import colors from '../utils/colors';
import GenericText from '../utils/GenericText';
import CircleLogo from '../views/CircleLogo';
import constants from '../utils/constants';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chatArray: [],
      newChat: '',
    };
    this.props.navigation.addListener('focus', this.handleFocusListener);
    this.props.navigation.addListener('blur', this.handleBlurListener);
  }

  // componentDidMount() {
  //   this.handleFocusListener();
  // }

  // handleFocusListener = () => {
  //   this.socket = io(constants.server, {});
  //   const {username} = this.props;
  //   this.socket.emit('join', username);
  //   this.socket.on('get_message', messageObject => {
  //     const message = {
  //       text: messageObject.message,
  //       sender: messageObject.fromUser,
  //     };
  //     this.setState({chatArray: [message, ...this.state.chatArray]});
  //   });
  //   this.socket.on('notOnlineError', () => {
  //     Toast.show('The user is not online yet', Toast.SHORT);
  //     const tempArray = this.state.chatArray;
  //     tempArray.pop();
  //     this.setState({chatArray: [...tempArray]});
  //   });
  // };

  // handleBlurListener = () => {
  //   const {username} = this.props;
  //   this.socket.emit('exit', username);
  // };

  renderNoChatsFound = () => {
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <GenericText
          text={'Start the chat by sending a message!'}
          size={20}
          color={colors.lightGray}
          style={{marginTop: 80}}
        />
      </View>
    );
  };

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
    const {username} = this.props;
    const byMe = chat.sender === username;
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

  chatSendOnPress = () => {
    const newChat = this.state.newChat;
    const {username} = this.props;
    const {friend} = this.props.route.params;
    if (newChat !== '') {
      const messageObject = {
        message: this.state.newChat,
        fromUser: username,
        toUser: friend.username,
      };
      this.setState({
        chatArray: [{text: newChat, sender: username}, ...this.state.chatArray],
      });
      this.socket.emit('send_message', messageObject);
      this.setState({newChat: ''});
    }
  };

  renderTextInput = () => {
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
            onPress={this.chatSendOnPress}
            textSize={7}
          />
        </View>
      </KeyboardAvoidingView>
    );
  };

  renderFlatList = () => {
    return (
      <FlatList
        extraData={this.state.chatArray}
        inverted
        keyExtractor={(item, index) => index.toString()}
        data={this.state.chatArray}
        renderItem={({item}) => {
          return this.renderChats(item);
        }}
        style={{flex: 0.9, marginTop: 3}}
      />
    );
  };

  render() {
    const noChats = this.state.chatArray.length === 0;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {!noChats && this.renderFlatList()}
        {noChats && this.renderNoChatsFound()}
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

const mapStateToProps = state => {
  return {
    ...state.Login,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
