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

const SCREEN_WIDTH = Dimensions.get('window').width;

class SendReq extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      showLoader: false,
    };
    this.searchedObject = null;
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

  searchUsername = () => {
    const {searchUsername, token} = this.props;
    const username = this.state.username;
    this.setState({showLoader: true});
    searchUsername(token, username, this.searchUsernameCallback);
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
              this.searchUsername();
              Keyboard.dismiss();
            }}
            textSize={9}
            text={'Search'}
          />
        </View>
      </KeyboardAvoidingView>
    );
  };

  sendReqOnPress = () => {
    const {token, sendRequest} = this.props;
    sendRequest(token, this.searchedObject.username);
  };

  renderUser = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.darkGray,
          height: 250,
          width: 250,
          borderRadius: 5,
          marginTop: 80,
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            borderRadius: 80,
            marginTop: 5,
            backgroundColor: colors.lightOrange,
          }}
        />
        <GenericText
          text={this.searchedObject.username}
          color={colors.lightGray}
          size={50}
          style={{marginLeft: 10}}
        />
        <GenericButton
          text={'Send request'}
          style={{marginTop: 20}}
          fontSize={13}
          onPress={this.sendReqOnPress}
        />
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
    backgroundColor: colors.blue,
    alignItems: 'center',
    paddingTop: 50,
  },
  textInput: {
    height: 40,
    width: SCREEN_WIDTH - 60,
    backgroundColor: colors.lightGray,
    fontSize: 17,
    borderRadius: 5,
  },
});

SendReq.propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.Login.token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    sendRequest: (token, username) => {
      return dispatch(sendReq(token, username));
    },
    searchUsername: (token, username, callback) => {
      return dispatch(searchUser(token, username, callback));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendReq);
