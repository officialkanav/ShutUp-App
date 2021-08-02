/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';
import CircleLogo from '../CircleLogo';
import GenericButton from '../../utils/GenericButton';
import {sendReq, searchUser} from '../../actions/friendsAction';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import {compareId} from '../../utils/helperFunctions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SendReq extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      showLoader: false,
    };
    this.searchedObject = null;
    this.socket = props.socket;
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

  searchUsernameCallback = (err, json) => {
    if (err) {
      this.searchedObject = false;
    } else {
      this.searchedObject = json;
    }
    this.setState({showLoader: false});
  };

  searchUser = () => {
    const {searchUser, token} = this.props;
    const username = this.state.username;
    this.setState({showLoader: true});
    searchUser(token, username, this.searchUsernameCallback);
  };

  renderTextInput = () => {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            ...styles.textInput,
          }}
          onChangeText={value => {
            this.setState({username: value});
            this.searchedObject = null;
          }}
          value={this.state.username}
          placeholder={'Enter username'}
        />
        <View style={{marginLeft: 5}}>
          <CircleLogo
            radius={40}
            noAnimation={true}
            onPress={() => {
              this.searchUser();
              Keyboard.dismiss();
            }}
            textSize={9}
            text={'Search'}
          />
        </View>
      </KeyboardAvoidingView>
    );
  };

  isUserFriend = () => {
    const {friends} = this.props;
    const searchedId = this.searchedObject._id;
    if (friends) {
      for (let i = 0; i < friends.length; i++) {
        if (
          compareId(friends[i], searchedId) ||
          compareId(friends[i]._id, searchedId)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  openChatOnPress = () => {
    const {username, name} = this.searchedObject;
    this.props.navigation.navigate('ChattingScreen', {
      friend: {username, name},
      socket: this.socket,
    });
  };

  sendReqOnPress = () => {
    const {token, sendReq} = this.props;
    sendReq(token, this.searchedObject.username);
  };

  renderUser = () => {
    const {myUsername} = this.props;
    const isFriend = this.isUserFriend();
    const text = isFriend ? 'Open Chat' : 'Send Request';
    const onPress = isFriend ? this.openChatOnPress : this.sendReqOnPress;
    const showButton = this.searchedObject.username !== myUsername;
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.darkGray,
          width: 200,
          marginTop: 50,
          borderRadius: 5,
        }}>
        <GenericText
          text={this.searchedObject.name}
          color={colors.lightGray}
          size={30}
          style={{marginLeft: 10, textAlign: 'center'}}
        />
        <GenericText
          text={`@${this.searchedObject.username}`}
          color={colors.lightGray}
          size={10}
          style={{marginTop: 1}}
        />
        {showButton && (
          <GenericButton
            text={text}
            style={{margin: 20}}
            fontSize={13}
            onPress={onPress}
          />
        )}
      </View>
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

  render() {
    const {showLoader} = this.state;
    return (
      <View style={styles.container}>
        {this.renderTextInput()}
        {this.searchedObject && this.renderUser()}
        {this.searchedObject === false && this.renderUserNotFound()}
        {showLoader && this.renderLoader()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 50,
  },
  textInput: {
    height: 40,
    width: SCREEN_WIDTH - 60,
    backgroundColor: colors.gray,
    fontSize: 17,
    borderRadius: 5,
    color: colors.black,
  },
});

SendReq.propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.Login.token,
    friends: state.Login.friends,
    myUsername: state.Login.username,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    sendReq: (token, username) => {
      return dispatch(sendReq(token, username));
    },
    searchUser: (token, username, callback) => {
      return dispatch(searchUser(token, username, callback));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendReq);
