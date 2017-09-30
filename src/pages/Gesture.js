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

var Password1 = '';

export default class Gesture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '\n\n\n\nplease input your password gesture',
      status: 'normal'
    }
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
    if (Password1 == '') {
      this.setState({
        message: '\n\n\n\nplease input your password gesture',
        status: 'normal'
      });
    } else {
      this.setState({
        message: '\n\n\n\nplease input your password gesture again',
        status: 'normal'
      });
    }
  }

  handleEnd(password) {
    if (Password1 == '') {
      Password1 = password;
      this.setState({
        status: 'normal'
      });
    } else {
      if (password == Password1) {
        if (password.length >= 5) {
          this.setState({
            message: '\n\n\n\ncorrect! your gesture is settled',
            status: 'right'
          });
          storage.load({
            key: 'l0calsettings'
          }).then( (settings) => {
            settings['suggestion_of_gesture_hide'] = true;
            settings['gesture'] = password;
            storage.save({
              key: 'l0calsettings',
              data: settings
            });
          }).catch((err) => {});
          setTimeout(() => {
            if (this.props.navigator) {
              this.props.navigator.pop();
            }
          }, 100);
        } else {
          this.setState({
            message: '\n\n\n\ntoo short',
            status: 'wrong'
          });
          Password1 = '';
        }
      } else {
        this.setState({
          message: '\n\n\n\nnot the same, please try again',
          status: 'wrong'
        });
        Password1 = '';
      }
    }
  }
}
