import React from 'react';
import AppNavigator from './appNavigator/AppNavigator';
import {Provider} from 'react-redux';
import Store from './store/store';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={Store}>
        <AppNavigator />
      </Provider>
    );
  }
}
