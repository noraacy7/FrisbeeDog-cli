import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default class QrCodeScanner extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <View></View>
    )
  }



  handleCancel() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBar: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBarText: {
    fontSize: 20,
    color: '#3c97e9'
  }
});
