/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import colors from '../utils/colors';
import GenericButton from '../utils/GenericButton';
import CircleLogo from './CircleLogo';

const SCREENWIDTH = Dimensions.get('window').width;

export default class Startpage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderLogo = () => {
    return (
      <View style={{marginTop: 100, height: 250}}>
        <CircleLogo textSize={50} radius={250} />
      </View>
    );
  };

  renderLoginButton = () => {
    const width = SCREENWIDTH - 60;
    const {navigate} = this.props.navigation;
    return (
      <GenericButton
        text={'Login'}
        fontSize={20}
        style={{height: 50, width, marginTop: 100}}
        onPress={() => {
          navigate('LoginScreen', {
            type: 'Login',
          });
        }}
      />
    );
  };

  renderSignupButton = () => {
    const width = SCREENWIDTH - 60;
    const {navigate} = this.props.navigation;
    return (
      <GenericButton
        text={'SignUp'}
        fontSize={20}
        style={{height: 50, width, marginTop: 15}}
        onPress={() => {
          navigate('LoginScreen', {
            type: 'SignUp',
          });
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderLogo()}
        {this.renderLoginButton()}
        {this.renderSignupButton()}
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

  circleText: {color: colors.darkGray},
});
