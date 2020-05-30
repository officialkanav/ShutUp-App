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
import {connect} from 'react-redux';
import {addChat} from '../actions/chatAction';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    const {chatArray} = props;
    this.state = {
      chatArray: chatArray ? chatArray : [],
      showOnlineSign: false,
      newChat: '',
    };
    this.socket = props.route.params.socket;
  }

  componentDidMount() {
    const {
      friend: {username},
    } = this.props.route.params;
    this.socket.emit('status', username, isOnline => {
      if (isOnline) {
        this.setState({showOnlineSign: true});
      } else {
        this.setState({showOnlineSign: false});
      }
    });
    this.socket.on('user_joined', jointUser => {
      if (username === jointUser && !this.state.showOnlineSign) {
        this.setState({showOnlineSign: true});
      }
    });
    this.socket.on('user_left', leftUser => {
      if (username === leftUser && this.state.showOnlineSign) {
        this.setState({showOnlineSign: false});
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const {chatArray} = this.props;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({chatArray});
    }
  }

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
        <View style={{width: '70%'}}>
          <GenericText
            text={name}
            color={colors.darkGray}
            size={30}
            style={{marginLeft: 10}}
          />
        </View>
        <GenericText
          text={`@${username}`}
          color={colors.darkGray}
          size={10}
          style={{position: 'absolute', right: 5, bottom: 5}}
        />
        {this.state.showOnlineSign && (
          <View
            style={{
              backgroundColor: colors.green,
              height: 15,
              width: 15,
              borderRadius: 15,
              position: 'absolute',
              right: 20,
            }}
          />
        )}
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
          byMe && {marginLeft: 0.325 * SCREEN_WIDTH},
        ]}>
        <GenericText
          text={chat.message}
          size={17}
          color={textColor}
          style={{position: 'relative', right: 0}}
        />
      </View>
    );
  };

  chatSendOnPress = () => {
    const newChat = this.state.newChat;
    const {username, addChatToReducer} = this.props;
    const {friend} = this.props.route.params;
    if (newChat !== '') {
      const messageObject = {
        message: this.state.newChat,
        sender: username,
        toUser: friend.username,
      };
      this.setState({
        chatArray: [
          {message: newChat, sender: username},
          ...this.state.chatArray,
        ],
        newChat: '',
      });
      addChatToReducer({
        username: messageObject.toUser,
        messageObject,
      });
      this.socket.emit('send_message', messageObject);
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
    paddingVertical: 14,
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

const mapStateToProps = (state, props) => {
  const {
    friend: {username},
  } = props.route.params;
  return {
    ...state.Login,
    chatArray: state.Chats[username],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addChatToReducer: message => {
      return dispatch(addChat(message));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
