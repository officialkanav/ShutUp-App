/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/colors';
import GenericText from '../utils/GenericText';
import CircleLogo from './CircleLogo';

const TextInputWidth = Dimensions.get('window').width - 40;

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      usernameText: '',
      passwordText: '',
    };
  }

  submitOnPress = () => {
    this.props.navigation.navigate('DashboardScreen');
  };

  renderLogo = () => {
    const {type} = this.props.route.params;
    return (
      <View style={{height: 150, marginTop: 50}}>
        <CircleLogo
          textSize={30}
          radius={150}
          onPress={this.submitOnPress}
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

  renderUsernameTextField = () => {
    return (
      <TextInput
        style={{
          ...styles.textInput,
          marginTop: 100,
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
    return (
      <View style={styles.container}>
        {this.renderWelcomeText()}
        {this.renderUsernameTextField()}
        {this.renderPasswordTextField()}
        {this.renderLogo()}
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
    fontSize: 30,
    borderRadius: 5,
  },
});

Login.propTypes = {
  type: PropTypes.string,
};
