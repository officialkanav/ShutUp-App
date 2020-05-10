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
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';
import CircleLogo from '../CircleLogo';
import ChatListComponent from '../Dashboard/ChatListComponent';
import GenericButton from '../../utils/GenericButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SendReq extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      matchFound: null,
    };
    this.searchedName = null;
  }

  searchUsername = () => {
    this.setState({matchFound: true});
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
            this.setState({username: value, matchFound: null});
          }}
          value={this.state.username}
          placeholder={'Enter username'}
        />
        <View style={{marginLeft: 5}}>
          <CircleLogo
            radius={40}
            noAnimation={true}
            onPress={() => {
              this.searchedName = this.state.username;
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
            backgroundColor: colors.lightGreen,
          }}
        />
        <GenericText
          text={'Kanav'}
          color={colors.lightGray}
          size={50}
          style={{marginLeft: 10}}
        />
        <GenericButton
          text={'Send request'}
          style={{marginTop: 10}}
          fontSize={13}
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
    const {matchFound} = this.state;
    return (
      <View style={styles.container}>
        {this.renderTextInput()}
        {matchFound && this.renderUser()}
        {matchFound === false && this.renderUserNotFound()}
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
