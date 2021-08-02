/* eslint-disable no-shadow */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  AppState,
} from 'react-native';
import colors from '../../utils/colors';
import ChatListComponent from './ChatListComponent';
import GenericText from '../../utils/GenericText';
import {refresh, logout} from '../../actions/friendsAction';
import {addChat, removeTopChat} from '../../actions/chatAction';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatList extends React.PureComponent {
  constructor(props) {
    super(props);
    const {friends} = props;
    this.state = {
      showLoader: false,
      friends: friends ? friends : [],
    };
    this.socket = props.socket;
  }

  componentDidMount() {
    const {addChat, removeTopChat} = this.props;
    AppState.addEventListener('change', this.handleAppStateChange);
    this.socket.on('get_message', messageObject => {
      const {onFocus} = this.props;
      addChat({username: messageObject.sender, messageObject});
      if (onFocus !== messageObject.sender) {
        Toast.show(messageObject.sender + ' sent a message', Toast.SHORT);
      }
    });
    this.socket.on('notOnlineError', username => {
      removeTopChat(username);
      Toast.show('User is offline, so Shut Up!', Toast.SHORT);
    });
  }

  handleAppStateChange = nextAppState => {
    const {username} = this.props;
    if (nextAppState.match(/inactive|background/)) {
      this.socket.emit('exit', username);
    } else if (nextAppState === 'active') {
      this.socket.emit('join', username);
    }
  };

  componentDidUpdate(prevProps) {
    const {
      friends,
      attemptingFriendsSearch,
      navigation: {navigate},
    } = this.props;
    if (prevProps !== this.props) {
      if (prevProps.friends !== null && friends === null) {
        return navigate('StartScreen');
      }
      if (attemptingFriendsSearch) {
        this.setState({showLoader: true});
      } else {
        this.setState({showLoader: false, friends});
      }
    }
  }

  renderLoader = () => {
    return (
      <Spinner
        isVisible={true}
        size={70}
        type={'ThreeBounce'}
        color={colors.lightGray}
      />
    );
  };

  renderLogoutButton = () => {
    const {logout, username} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.socket.emit('exit', username);
          logout();
        }}>
        <GenericText text={'Logout'} size={15} />
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          backgroundColor: colors.white,
        }}>
        <View style={{flexDirection: 'row', marginTop: 5, alignSelf: 'center'}}>
          {this.renderLogoutButton()}
        </View>
      </View>
    );
  };

  renderUserNotFound = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <GenericText
          text={'No friends found!'}
          size={20}
          color={colors.black}
          style={{marginTop: 80}}
        />
        <GenericText
          text={'Add friends and refresh'}
          size={20}
          color={colors.black}
          style={{marginTop: 5}}
        />
      </View>
    );
  };

  cardOnPress = (username, name) => {
    this.props.navigation.navigate('ChattingScreen', {
      friend: {username, name},
      socket: this.socket,
    });
  };

  renderChatCard = (username, name) => {
    return (
      <ChatListComponent
        username={username}
        name={name}
        onPress={this.cardOnPress}
        socket={this.socket}
      />
    );
  };

  renderList = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        extraData={this.state.friends}
        data={this.state.friends}
        renderItem={({item}) => {
          return this.renderChatCard(item.username, item.name);
        }}
      />
    );
  };

  render() {
    const {showLoader} = this.state;
    if (!this.state.friends) {
      return <View />;
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {!showLoader && this.state.friends.length === 0
          ? this.renderUserNotFound()
          : this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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

const mapStateToProps = state => {
  return {
    friends: state.Friends.friends,
    attemptingFriendsSearch: state.Friends.attemptingFriendsSearch,
    username: state.Login.username,
    token: state.Login.token,
    onFocus: state.Chats.onFocus,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    refresh: () => dispatch(refresh()),
    addChat: message => {
      return dispatch(addChat(message));
    },
    removeTopChat: username => dispatch(removeTopChat(username)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatList);
