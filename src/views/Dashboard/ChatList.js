/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
// import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import ChatListComponent from './ChatListComponent';
import GenericText from '../../utils/GenericText';
import {getFriends} from '../../actions/friendsAction';
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
    getFriendsList(token);
    this.props.navigation.addListener('focus', this.handleFocusListener);
  }

  handleFocusListener = () => {
    const {friends, token, getFriendsList} = this.props;
    if (friends === null && !this.state.showLoader) {
      this.setState({showLoader: true});
      getFriendsList(token);
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
    token: state.Login.token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getFriendsList: token => dispatch(getFriends(token)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatList);
