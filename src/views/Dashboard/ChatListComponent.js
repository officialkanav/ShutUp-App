/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import PropType from 'prop-types';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';
import {acceptReq, rejectReq} from '../../actions/friendsAction';
import {connect} from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    const {username, showRequestButtons} = this.props;
    this.state = {
      showOnlineSign: false,
    };
    this.socket = props.socket;
    if (!showRequestButtons) {
      this.socket.emit('status', username, isOnline => {
        if (isOnline) {
          this.setState({showOnlineSign: true});
        } else {
          this.setState({showOnlineSign: false});
        }
      });
    }
  }

  componentDidMount() {
    const {username, showRequestButtons} = this.props;
    if (!showRequestButtons) {
      this.socket.on('user_joined', jointUser => {
        if (username === jointUser && !this.state.showOnlineSign) {
          this.setState({showOnlineSign: true});
        }
      });
      this.socket.on('user_left', leftUser => {
        if (username === leftUser && this.state.showOnlineSign) {
          this.setState({showOnlineSign: false});
        }
      });
    }
  }

  reqButtonHelper = (text, onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <GenericText text={text} size={35} color={colors.darkGray} />
      </TouchableOpacity>
    );
  };

  renderOnlineIcon = () => {
    return (
      <View
        style={{
          backgroundColor: colors.green,
          height: 15,
          width: 15,
          borderRadius: 15,
          position: 'absolute',
          right: 20,
        }}
      />
    );
  };
  renderRequestButtons = () => {
    const {acceptReq, rejectReq, token, userObject} = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          right: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this.reqButtonHelper('+', () => {
          acceptReq(token, userObject);
        })}
        <View style={{marginLeft: 15}}>
          {this.reqButtonHelper('-', () => {
            rejectReq(token, userObject);
          })}
        </View>
      </View>
    );
  };

  renderChatCard = (username, name) => {
    const {onPress, showRequestButtons} = this.props;
    const {showOnlineSign} = this.state;
    const nameWidth = showRequestButtons
      ? SCREEN_WIDTH - 145
      : SCREEN_WIDTH - 10;
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
          <View style={{width: nameWidth}}>
            <GenericText
              text={name}
              color={colors.darkGray}
              size={30}
              style={{marginLeft: 10}}
            />
          </View>
          <GenericText
            text={`@${username}`}
            color={colors.darkGray}
            size={10}
            style={{marginLeft: 10}}
          />
        </View>
        {showRequestButtons && this.renderRequestButtons()}
        {!showRequestButtons && showOnlineSign && this.renderOnlineIcon()}
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
    paddingVertical: 5,
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
  socket: PropType.object,
};

ChatListComponent.defaultProps = {
  showRequestButtons: false,
};

const mapStateToProps = state => {
  return {
    token: state.Login.token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    acceptReq: (token, userObject) => {
      return dispatch(acceptReq(token, userObject));
    },
    rejectReq: (token, userObject) => {
      return dispatch(rejectReq(token, userObject));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListComponent);
