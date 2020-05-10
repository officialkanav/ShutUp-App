import React from 'react';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

export default class CircleLogo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    if (this.props.startAnimation && this.props.startAnimation === true) {
      this.startAnimation();
    }
  }

  startAnimation = () => {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      const {onPress} = this.props;
      if (onPress) {
        onPress();
      }
    });
  };

  renderCenterCircle = () => {
    const {radius: r, textSize} = this.props;
    const radius = this.animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [r, 0, r],
    });
    const fontSize = this.animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [textSize, 0, textSize],
    });
    const text = this.props.text || 'ShutUp';
    const {noAnimation, onPress} = this.props;
    const callback = noAnimation ? onPress : this.startAnimation;
    return (
      <TouchableOpacity onPress={callback}>
        <Animated.View
          style={{
            ...styles.centerCircle,
            height: radius,
            width: radius,
            borderRadius: radius,
          }}>
          <Animated.Text style={{fontSize, color: colors.darkGray}}>
            {text}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  render() {
    return <View>{this.renderCenterCircle()}</View>;
  }
}

const styles = StyleSheet.create({
  centerCircle: {
    backgroundColor: colors.lightGray,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
});

CircleLogo.propTypes = {
  startAnimation: PropTypes.bool,
  radius: PropTypes.number.isRequired,
  textSize: PropTypes.number.isRequired,
  noAnimation: PropTypes.bool,
  onPress: PropTypes.func,
  text: PropTypes.string,
};

CircleLogo.defaultProps = {
  noAnimation: false,
};
