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
// import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import ChatListComponent from './ChatListComponent';
import GenericText from '../../utils/GenericText';
import {getFriends, refresh, logout} from '../../actions/friendsAction';
import {addChat} from '../../actions/chatAction';
import io from 'socket.io-client';
import constants from '../../utils/constants';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatList extends React.PureComponent {
  constructor(props) {
    super(props);
    const {token, getFriendsList} = this.props;
    this.state = {
      showLoader: false,
    };
    this.friends = [];
    this.socket = io(constants.server, {});
    getFriendsList(token);
    this.props.navigation.addListener('focus', this.handleFocusListener);
  }

  componentDidMount() {
    const {username, addChatToReducer} = this.props;
    AppState.addEventListener('change', this.handleAppStateChange);
    this.socket.emit('join', username);
    this.socket.on('get_message', messageObject => {
      const message = {
        text: messageObject.message,
        sender: messageObject.fromUser,
      };
      addChatToReducer({friendUsername: message.sender, message});
    });
    this.socket.on('notOnlineError', () => {
      Toast.show('The user is not online yet', Toast.SHORT);
    });
  }

  componentWillUnmount() {}

  handleFocusListener = () => {
    const {friends, token, getFriendsList} = this.props;
    if (friends === null && !this.state.showLoader) {
      this.setState({showLoader: true});
      getFriendsList(token);
    }
  };

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
      attemptingSearch,
      navigation: {navigate},
      token,
    } = this.props;
    if (prevProps !== this.props) {
      if (prevProps.friends !== null && friends === null) {
        return navigate('StartScreen');
      }
      if (attemptingSearch) {
        this.setState({showLoader: true});
      } else if (!attemptingSearch && this.state.showLoader) {
        if (friends === null) {
          this.setState({showLoader: false});
          if (token) {
            return navigate('DashboardScreen');
          }
          return navigate('StartScreen');
        } else {
          this.friends = friends;
          this.setState({showLoader: false});
        }
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
    const {logoutUser} = this.props;
    return (
      <TouchableOpacity onPress={logoutUser}>
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
          backgroundColor: colors.lightGray,
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
          color={colors.lightGray}
          style={{marginTop: 80}}
        />
        <GenericText
          text={'Add friends and refresh'}
          size={20}
          color={colors.lightGray}
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
        data={this.friends}
        renderItem={({item}) => {
          return this.renderChatCard(item.username, item.name);
        }}
      />
    );
  };

  render() {
    const {showLoader} = this.state;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {!showLoader && this.friends.length === 0
          ? this.renderUserNotFound()
          : this.renderList()}
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

const mapStateToProps = state => {
  return {
    friends: state.Friends.friends,
    attemptingSearch: state.Friends.attemptingSearch,
    username: state.Login.username,
    token: state.Login.token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getFriendsList: token => dispatch(getFriends(token)),
    logoutUser: () => dispatch(logout()),
    refreshApp: () => dispatch(refresh()),
    addChatToReducer: message => {
      return dispatch(addChat(message));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatList);
