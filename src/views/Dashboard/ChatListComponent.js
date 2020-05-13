/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import PropType from 'prop-types';
// import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ChatListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  reqButtonHelper = (text, onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <GenericText text={text} size={35} color={colors.darkGray} />
      </TouchableOpacity>
    );
  };

  renderRequestButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          right: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this.reqButtonHelper('+', () => {})}
        <View style={{marginLeft: 15}}>
          {this.reqButtonHelper('-', () => {})}
        </View>
      </View>
    );
  };

  renderChatCard = (username, name) => {
    const {onPress, showRequestButtons} = this.props;
    return (
      <TouchableOpacity
        style={styles.chatCardContainer}
        disabled={showRequestButtons}
        onPress={() => {
          onPress(username, name);
        }}>
        <View
          style={{
            height: 55,
            width: 55,
            borderRadius: 55,
            marginLeft: 5,
            backgroundColor: colors.darkGray,
          }}
        />
        {/* image above */}
        <View>
          <GenericText
            text={name}
            color={colors.darkGray}
            size={30}
            style={{marginLeft: 10}}
          />
          <GenericText
            text={`@${username}`}
            color={colors.darkGray}
            size={10}
            style={{marginLeft: 10}}
          />
        </View>
        {showRequestButtons && this.renderRequestButtons()}
      </TouchableOpacity>
    );
  };

  render() {
    const {username, name} = this.props;
    return <View>{this.renderChatCard(username, name)}</View>;
  }
}

const styles = StyleSheet.create({
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

ChatListComponent.propTypes = {
  onPress: PropType.func.isRequired,
  username: PropType.string.isRequired,
  name: PropType.string.isRequired,
  showRequestButtons: PropType.bool,
};

ChatListComponent.defaultProps = {
  showRequestButtons: false,
};
