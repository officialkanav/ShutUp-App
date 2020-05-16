/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../utils/colors';
import CircleLogo from './CircleLogo';
import {authenticateToken} from '../actions/loginAction';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Toast from 'react-native-simple-toast';

class Splash extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
    };
  }

  componentDidMount() {
    const {
      token,
      navigation: {navigate},
      sendLoginReq,
    } = this.props;
    if (token === null) {
      navigate('StartScreen');
    } else {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({showLoader: true});
      sendLoginReq(token);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      attemptingLogin,
      name,
      navigation: {navigate},
    } = this.props;
    if (prevProps !== this.props) {
      if (!attemptingLogin && this.state.showLoader) {
        if (name === null) {
          return navigate('StartScreen');
        } else {
          Toast.show('Logging in ' + name);
          return navigate('DashboardScreen');
        }
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
  };
};

function mapDispatchToProps(dispatch) {
  return {
    sendLoginReq: token => {
      return dispatch(authenticateToken(token));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
