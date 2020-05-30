/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/colors';
import GenericText from '../utils/GenericText';
import CircleLogo from './CircleLogo';
import {connect} from 'react-redux';
import {loginAsync, SignUpAsync} from '../actions/loginAction';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-spinkit';
import {getFriends, getReqReceived, getReqSent} from '../actions/friendsAction';

const TextInputWidth = Dimensions.get('window').width - 40;

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      usernameText: '',
      passwordText: '',
      nameText: '',
      showLoader: false,
    };
    this.loginComplete = false;
    this.reqComplete = false;
    this.reqSentComplete = false;
    this.friendsComplete = false;
    this.dataDownloadComplete = false;
  }

  componentDidUpdate(prevProps) {
    const {
      name,
      navigation: {navigate},
      attemptingLogin,
      attemptingFriendsSearch,
      attemptingReqReceivedSearch,
      attemptingReqSentSearch,
    } = this.props;

    if (prevProps !== this.props && !this.dataDownloadComplete) {
      if (!attemptingLogin && prevProps.attemptingLogin) {
        if (!name) {
          this.setState({showLoader: false});
          return navigate('StartScreen');
        }
        this.getData();
        this.loginComplete = true;
      }
      if (!attemptingFriendsSearch && prevProps.attemptingFriendsSearch) {
        this.friendsComplete = true;
      }
      if (
        !attemptingReqReceivedSearch &&
        prevProps.attemptingReqReceivedSearch
      ) {
        this.reqComplete = true;
      }
      if (!attemptingReqSentSearch && prevProps.attemptingReqSentSearch) {
        this.reqSentComplete = true;
      }
      if (
        this.loginComplete &&
        this.friendsComplete &&
        this.reqComplete &&
        this.reqSentComplete
      ) {
        this.dataDownloadComplete = true;
        Toast.show('Logging in ' + this.props.username, Toast.SHORT);
        this.setState({showLoader: false});
        return navigate('DashboardScreen');
      }
    }
  }

  getData = () => {
    const {
      token,
      navigation: {navigate},
      getFriends,
      getReqReceived,
      getReqSent,
    } = this.props;
    if (token === null) {
      navigate('StartScreen');
    } else {
      this.setState({showLoader: true});
      getFriends(token);
      getReqReceived(token);
      getReqSent(token);
    }
  };

  renderLoader = () => {
    return (
      <View style={{position: 'absolute', bottom: 10}}>
        <Spinner
          isVisible={true}
          size={70}
          type={'ThreeBounce'}
          color={colors.lightGray}
        />
      </View>
    );
  };

  logoOnPress = () => {
    const {type} = this.props.route.params;
    const {sendLoginReq, sendSignUpReq} = this.props;
    if (this.state.usernameText === '') {
      return Toast.show('Username cannot be empty', Toast.SHORT);
    } else if (this.state.passwordText === '') {
      return Toast.show('Password cannot be empty', Toast.SHORT);
    } else if (this.state.passwordText.length < 7) {
      return Toast.show('Password length < 7', Toast.SHORT);
    }
    this.buttonPressed = true;
    const username = this.state.usernameText;
    const password = this.state.passwordText;
    if (type === 'Login') {
      sendLoginReq(username, password);
    } else {
      const name = this.state.nameText;
      if (name === '') {
        return Toast.show('Name cannot be empty', Toast.SHORT);
      }
      sendSignUpReq(name, username, password);
    }
  };

  renderLogo = () => {
    const {type} = this.props.route.params;
    return (
      <View style={{height: 150, marginTop: 50}}>
        <CircleLogo
          textSize={30}
          radius={150}
          noAnimation={true}
          onPress={this.logoOnPress}
          text={type}
        />
      </View>
    );
  };

  renderWelcomeText = () => {
    return (
      <GenericText
        size={60}
        text={'Welcome'}
        color={colors.lightGray}
        style={{marginTop: 30}}
      />
    );
  };

  renderNameTextField = () => {
    return (
      <TextInput
        style={{
          ...styles.textInput,
          marginTop: 100,
        }}
        onChangeText={value => {
          this.setState({nameText: value});
        }}
        value={this.state.nameText}
        placeholder={'Name'}
      />
    );
  };

  renderUsernameTextField = () => {
    const {type} = this.props.route.params;
    const marginTop = type === 'Login' ? 100 : 30;
    return (
      <TextInput
        style={{
          ...styles.textInput,
          marginTop,
        }}
        onChangeText={value => {
          this.setState({usernameText: value});
        }}
        value={this.state.usernameText}
        placeholder={'Username'}
      />
    );
  };

  renderPasswordTextField = () => {
    return (
      <TextInput
        style={{
          ...styles.textInput,
          marginTop: 30,
        }}
        onChangeText={value => {
          this.setState({passwordText: value});
        }}
        value={this.state.passwordText}
        placeholder={'Password'}
        secureTextEntry={true}
      />
    );
  };

  render() {
    const {type} = this.props.route.params;
    const {showLoader} = this.state;
    return (
      <View style={styles.container}>
        {this.renderWelcomeText()}
        {type === 'SignUp' && this.renderNameTextField()}
        {this.renderUsernameTextField()}
        {this.renderPasswordTextField()}
        {this.renderLogo()}
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
    height: 50,
    width: TextInputWidth,
    backgroundColor: colors.lightGray,
    fontSize: 25,
    borderRadius: 5,
  },
});

Login.propTypes = {
  type: PropTypes.string,
  sendLoginReq: PropTypes.func,
  username: PropTypes.string,
  name: PropTypes.string,
  token: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    ...state.Login,
    attemptingFriendsSearch: state.Friends.attemptingFriendsSearch,
    attemptingReqReceivedSearch: state.Friends.attemptingReqReceivedSearch,
    attemptingReqSentSearch: state.Friends.attemptingReqSentSearch,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    sendLoginReq: (username, password) => {
      return dispatch(loginAsync(username, password));
    },
    sendSignUpReq: (name, username, password) => {
      return dispatch(SignUpAsync(name, username, password));
    },
    getFriends: token => dispatch(getFriends(token)),
    getReqReceived: token => dispatch(getReqReceived(token)),
    getReqSent: token => dispatch(getReqSent(token)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
