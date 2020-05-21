/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import PropType from 'prop-types';
// import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';
import {acceptReq, rejectReq} from '../../actions/friendsAction';
import {connect} from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ChatListComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showOnlineSign: true,
    };
    this.socket = props.socket;
  }

  componentDidMount() {
    const {username} = this.props;
    this.socket.emit('status', username, isOnline => {
      if (isOnline) {
        this.setState({showOnlineSign: true});
      } else {
        this.setState({showOnlineSign: false});
      }
    });
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
    const {acceptRequest, rejectRequest, token, username} = this.props;
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
          acceptRequest(token, username);
        })}
        <View style={{marginLeft: 15}}>
          {this.reqButtonHelper('-', () => {
            rejectRequest(token, username);
          })}
        </View>
      </View>
    );
  };

  renderChatCard = (username, name) => {
    const {onPress, showRequestButtons} = this.props;
    const {showOnlineSign} = this.state;
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
    acceptRequest: (token, username) => {
      return dispatch(acceptReq(token, username));
    },
    rejectRequest: (token, username) => {
      return dispatch(rejectReq(token, username));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListComponent);
