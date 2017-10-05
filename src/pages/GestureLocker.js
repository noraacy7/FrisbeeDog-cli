import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  TouchableOpacity
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
import * as Theme from '../config/Theme.js';
import Main from './Main.js';

var Password1 = '';

export default class GestureLocker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '\n\n\n\nplease input your password gesture',
      status: 'normal'
    }
  }

  componentDidMount() {
    // get settings and update state properties
    storage.load({
      key: 'l0calsettings'
    }).then( (settings) => {
      if (settings.gesture != '' && settings.gesture.length > 0) {
        Password1 = settings.gesture;
      }
      this.setState({l0calsettings: settings});
    }).catch((err) => {});
  }

  render() {
    return(
      <PasswordGesture ref='pg'
        rightColor={Theme.defaultTheme.themeColor}
        message={this.state.message}
        status={this.state.status}
        onStart={ () => this.handleStart() }
        onEnd={
          (password) => this.handleEnd(password)
        }
        innerCircle={true}
        outerCircle={true}>
        </PasswordGesture>
    )
  }

  handleStart() {
    this.setState({
      message: '\n\n\n\nplease input your password gesture',
      status: 'normal'
    });
  }

  handleEnd(password) {
    console.log(">>>"+Password1);
    if (password == Password1 && Password1 != '') {
      this.setState({
        message: '\n\n\n\ncorrect!',
        status: 'right'
      });
      storage.save({
        key: 'user',
        data: {
          verify_login: true
        }
      });
      setTimeout(() => {
        if (this.props.navigator) {
          this.props.navigator.resetTo({
            name: 'Main',
            component: Main
          });
        }
      }, 100);
    } else {
      this.setState({
        message: '\n\n\n\nyour gesture is wrong',
        status: 'wrong'
      });
    }
  }
}
