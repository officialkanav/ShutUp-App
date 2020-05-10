/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import colors from './colors';
import GenericText from './GenericText';

export default class GenericButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {style, text, onPress} = this.props;
    const fontSize = this.props.fontSize || 10;
    return (
      <TouchableOpacity
        style={{...styles.container, ...style}}
        onPress={onPress}>
        <GenericText size={fontSize} text={text} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    height: 40,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
  }
});

GenericButton.propTypes = {
  style: PropTypes.object,
  fontSize: PropTypes.number,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
