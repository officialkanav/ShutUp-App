import React from 'react';
import AppNavigator from './appNavigator/AppNavigator';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return <AppNavigator />;
  }
}
