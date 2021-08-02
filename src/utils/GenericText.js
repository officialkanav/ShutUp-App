/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import colors from './colors';

export default class GenericText extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    let {text, size, color, style} = this.props;
    const fontSize = size || 13;
    color = color || colors.black;
    return (
      <Text
        style={{
          fontSize,
          color,
          fontWeight: '400',
          ...style,
        }}>
        {text}
      </Text>
    );
  }
}

GenericText.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
};
