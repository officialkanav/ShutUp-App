/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';
import ChatListComponent from './ChatListComponent';
import {getReqRecieved} from '../../actions/friendsAction';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

class ViewReq extends React.PureComponent {
  constructor(props) {
    const {getPendingRequests, token} = props;
    super(props);
    this.state = {
      showLoader: true,
    };
    this.pendingRequests = [];
    getPendingRequests(token);
    this.props.navigation.addListener('focus', this.handleFocusListener);
  }

  handleFocusListener = () => {
    const {reqReceived, token, getPendingRequests} = this.props;
    if (reqReceived === null && !this.state.showLoader) {
      this.setState({showLoader: true});
      getPendingRequests(token);
    }
    this.pendingRequests = reqReceived;
  };

  componentDidUpdate(prevProps) {
    const {
      attemptingSearch,
      reqReceived,
      navigation: {navigate},
      token,
    } = this.props;
    if (prevProps !== this.props) {
      if (attemptingSearch) {
        this.setState({showLoader: true});
      } else if (!attemptingSearch && this.state.showLoader) {
        if (reqReceived === null) {
          this.setState({showLoader: false});
          if (token) {
            return navigate('DashboardScreen');
          }
          return navigate('StartScreen');
        } else {
          this.pendingRequests = reqReceived;
          this.setState({showLoader: false});
        }
      }
    }
  }

  renderLoader = () => {
    return (
      <Spinner
        isVisible={true}
        size={70}
        type={'ThreeBounce'}
        color={colors.lightGray}
      />
    );
  };

  renderUserNotFound = () => {
    return (
      <GenericText
        text={'No pending requests!'}
        size={20}
        color={colors.lightGray}
        style={{marginTop: 80}}
      />
    );
  };

  renderUser = item => {
    return (
      <ChatListComponent
        name={item.name}
        username={item.username}
        onPress={() => {}}
        showRequestButtons={true}
      />
    );
  };

  renderFriendList = () => {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={this.pendingRequests}
        renderItem={({item}) => {
          return this.renderUser(item);
        }}
      />
    );
  };

  render() {
    const {showLoader} = this.state;
    return (
      <View style={styles.container}>
        {!showLoader && this.pendingRequests.length === 0
          ? this.renderUserNotFound()
          : this.renderFriendList()}
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
  },
});

ViewReq.propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.Login.token,
    ...state.Friends,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getPendingRequests: token => {
      return dispatch(getReqRecieved(token));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewReq);
