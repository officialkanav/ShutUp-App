/* eslint-disable no-shadow */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../utils/colors';
import CircleLogo from './CircleLogo';
import {authenticateToken} from '../actions/loginAction';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Toast from 'react-native-simple-toast';
import {getFriends, getReqReceived} from '../actions/friendsAction';
import {getChats} from '../actions/chatAction';

class Splash extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
    };
    this.loginComplete = false;
    this.reqComplete = false;
    this.friendsComplete = false;
    this.chatsComplete = false;
  }

  componentDidMount() {
    const {
      token,
      navigation: {navigate},
      authenticateToken,
      getFriends,
      getReqReceived,
      getChats,
    } = this.props;
    if (token === null) {
      navigate('StartScreen');
    } else {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({showLoader: true});
      this.loadingLogin = true;
      authenticateToken(token);
      getFriends(token);
      getReqReceived(token);
      getChats(token);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      name,
      navigation: {navigate},
      attemptingLogin,
      attemptingSearch,
      attemptingChatSearch,
      attemptingReqSearch,
    } = this.props;

    if (prevProps !== this.props) {
      if (!attemptingLogin && prevProps.attemptingLogin) {
        if (!name) {
          this.setState({showLoader: false});
          return navigate('StartScreen');
        }
        this.loginComplete = true;
      }
      if (!attemptingSearch && prevProps.attemptingSearch) {
        this.friendsComplete = true;
      }
      if (!attemptingReqSearch && prevProps.attemptingReqSearch) {
        this.reqComplete = true;
      }
      if (!attemptingChatSearch && prevProps.attemptingChatSearch) {
        this.chatsComplete = true;
      }
      console.log(attemptingLogin, attemptingReqSearch, attemptingSearch);
      console.log(this.loginComplete, this.reqComplete, this.friendsComplete)
      if (this.loginComplete && this.friendsComplete && this.reqComplete) {
        Toast.show('ShutUp ' + name);
        this.setState({showLoader: false});
        return navigate('DashboardScreen');
      }
    }
  }

  renderLogo = () => {
    return (
      <View style={{height: 250}}>
        <CircleLogo textSize={50} radius={250} noAnimation={true} />
      </View>
    );
  };

  renderLoadingLogo = () => {
    return (
      <View style={{height: 250, width: 250, justifyContent: 'center'}}>
        <Spinner
          isVisible={true}
          size={250}
          type={'Bounce'}
          color={colors.lightGray}
        />
        <Text
          style={{
            fontSize: 50,
            color: colors.darkGray,
            alignSelf: 'center',
            position: 'absolute',
          }}>
          {'ShutUp'}
        </Text>
      </View>
    );
  };

  render() {
    const {showLoader} = this.state;
    return (
      <View style={styles.container}>
        {showLoader && this.renderLoadingLogo()}
        {!showLoader && this.renderLogo()}
        <Spinner
          isVisible={true}
          size={70}
          type={'ThreeBounce'}
          color={colors.lightGray}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    ...state.Login,
    attemptingSearch: state.Friends.attemptingSearch,
    attemptingReqSearch: state.Friends.attemptingReqSearch,
    attemptingChatSearch: state.Chats.attemptingChatSearch,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    authenticateToken: token => {
      return dispatch(authenticateToken(token));
    },
    getFriends: token => dispatch(getFriends(token)),
    getReqReceived: token => dispatch(getReqReceived(token)),
    getChats: token => dispatch(getChats(token)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
