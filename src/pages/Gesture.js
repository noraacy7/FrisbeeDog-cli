import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import PasswordGesture from 'react-native-gesture-password';

var Password1 = '';

export default class Gesture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'please input your password gesture',
      status: 'normal'
    }
  }

  render() {
    return(
      <PasswordGesture ref='pg'
        rightColor={'#3c97e9'} 
        message={this.state.message}
        status={this.state.status}
        onStart={ () => this.handleStart() }
        onEnd={
          (password) => this.props.initpswd ? this.handleEndSetPassword(password) : this.handleEnd(password)
        }
        innerCircle={true}
        outerCircle={true}
      />
    )
  }

  handleStart() {
    if (this.props.initpswd) {
      if (Password1 == '') {
        this.setState({
          message: 'please input your password gesture'
        });
      } else {
        this.setState({
          message: 'please input your password gesture again'
        });
      }
    }
  }

  handleEndSetPassword(password) {

  }

  handleEnd(password) {

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink'
  }
});
