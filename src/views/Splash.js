/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-shadow */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../utils/colors';
import CircleLogo from './CircleLogo';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Toast from 'react-native-simple-toast';
import {authenticateToken} from '../actions/loginAction';

class Splash extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
    };
    this.gettingData = false;
  }

  componentDidMount() {
    const {
      token,
      navigation: {navigate},
      authenticateToken,
    } = this.props;
    if (token === null) {
      navigate('StartScreen');
    } else {
      this.gettingData = true;
      this.setState({showLoader: true});
      authenticateToken(token);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      name,
      navigation: {navigate},
      attemptingLogin,
    } = this.props;

    if (prevProps !== this.props && this.gettingData) {
      if (!attemptingLogin && prevProps.attemptingLogin) {
        if (!name) {
          this.setState({showLoader: false});
          return navigate('StartScreen');
        } else {
          this.gettingData = false;
          Toast.show('ShutUp ' + name);
          this.setState({showLoader: false});
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
    backgroundColor: colors.white,
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
    authenticateToken: token => {
      return dispatch(authenticateToken(token));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
