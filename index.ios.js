/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import {
  Provider
} from 'react-redux';
import configureStore from './src/store/ConfigureStore.js';
import App from './src/container/App';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Frisbeedog', () => Root);
