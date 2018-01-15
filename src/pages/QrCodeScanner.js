import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  DeviceEventEmitter
} from 'react-native';
import Camera from 'react-native-camera';
import * as Theme from '../component/Theme.js';

export default class QrCodeScanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.successed = false;
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera ref={ (cam) => {this.camera = cam;}}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={this.handleBarCodeRead.bind(this)}>
          <View style={styles.cameraViewWrap}>
            <View style={styles.cameraView}>
              <View key='1' style={[styles.borderLeftTop, styles.borderBox]}/>
              <View key='2' style={[styles.borderRightTop, styles.borderBox]}/>
              <View key='3' style={[styles.borderLeftBottom, styles.borderBox]}/>
              <View key='4' style={[styles.borderRightBottom, styles.borderBox]}/>
            </View>
          </View>
        </Camera>
        <TouchableOpacity style={styles.statusBar} onPress={
          () => {
            if (this.props.navigator) {
              this.props.navigator.pop();
            }
          }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }

  handleBarCodeRead(data) {
    if (this.successed) {
      return;
    }
    this.successed = true;

    Vibration.vibrate(); // shake, shake, shake

    console.log(data.data);

    DeviceEventEmitter.emit("barcoderead", data.data);

    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }

  handleCancel() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  preview: {
    backgroundColor: 'rgba(0,0,0,1)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  statusBar: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 20,
    color: Theme.defaultTheme.themeColor,
  },
  cameraViewWrap: {
    height: 350,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cameraView: {
    height: 250,
    width: 250
  },
  borderBox: {
    position: 'absolute',
    borderWidth: 2.0,
    height: 35,
    width: 35
  },
  borderLeftTop: {
    borderColor: 'transparent',
    borderLeftColor: Theme.defaultTheme.cameraBorderColor,
    borderTopColor: Theme.defaultTheme.cameraBorderColor,
    left: 0,
    top: 0
  },
  borderRightTop: {
    borderColor: 'transparent',
    borderRightColor: Theme.defaultTheme.cameraBorderColor,
    borderTopColor: Theme.defaultTheme.cameraBorderColor,
    right: 0,
    top: 0
  },
  borderLeftBottom: {
    borderColor: 'transparent',
    borderLeftColor: Theme.defaultTheme.cameraBorderColor,
    borderBottomColor: Theme.defaultTheme.cameraBorderColor,
    left: 0,
    bottom: 0
  },
  borderRightBottom: {
    borderColor: 'transparent',
    borderRightColor: Theme.defaultTheme.cameraBorderColor,
    borderBottomColor: Theme.defaultTheme.cameraBorderColor,
    right: 0,
    bottom: 0
  }
});
