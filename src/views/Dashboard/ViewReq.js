/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../../utils/colors';
import GenericText from '../../utils/GenericText';
import ChatListComponent from './ChatListComponent';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

class ViewReq extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      attemptingReqReceivedSearch,
      reqReceived,
      navigation: {navigate},
    } = this.props;
    const {showLoader} = this.state;

    if (prevProps !== this.props) {
      if (prevProps.reqReceived !== null && reqReceived === null) {
        navigate('StartScreen');
      }

      if (attemptingReqReceivedSearch) {
        this.setState({showLoader: true});
      } else if (showLoader) {
        this.setState({showLoader: false});
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
        color={colors.black}
        style={{marginTop: 80}}
      />
    );
  };

  renderUser = item => {
    return (
      <ChatListComponent
        name={item.name}
        username={item.username}
        userObject={item}
        onPress={() => {}}
        showRequestButtons={true}
      />
    );
  };

  renderFriendList = () => {
    const {reqReceived} = this.props;
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        extraData={reqReceived}
        data={reqReceived}
        renderItem={({item}) => {
          return this.renderUser(item);
        }}
      />
    );
  };

  render() {
    const {showLoader} = this.state;
    const {reqReceived} = this.props;
    return (
      <View style={styles.container}>
        {!showLoader && reqReceived && reqReceived.length === 0
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
    backgroundColor: colors.white,
    alignItems: 'center',
  },
});

ViewReq.propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.Login.token,
    reqReceived: state.Friends.reqReceived,
    attemptingReqReceivedSearch: state.Friends.attemptingReqReceivedSearch,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewReq);
