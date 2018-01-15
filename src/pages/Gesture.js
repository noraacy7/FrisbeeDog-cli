import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  TouchableOpacity
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
import * as Theme from '../component/Theme.js';

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
          setTimeout(() => {
            if (this.props.navigator) {
              this.props.navigator.pop();
            }
          }, 100);
          storage.load({
            key: 'user'
          }).then( (l0calsettings) => {
            storage.save({
              key: 'user',
              data: {
                ...l0calsettings,
                suggestion_of_gesture_hide: true,
                gesture: password
              }
            });
          }).catch((err) => {
            console.log(err.toString());
          });

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
