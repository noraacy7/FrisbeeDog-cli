import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';

export default class QrCodeScanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      barcode: '',
      cameraType: 'back',
      text: 'Scan Address Code',
      torchMode: 'off',
      type: '',
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <BarcodeScanner style={{flex: 1}}
          onBarCodeRead={this.handleBarcodeReceived.bind(this)}
          cameraType={this.state.cameraType}
          torchMode={this.state.torchMode}
        />
        <TouchableOpacity style={styles.statusBar} onPress={this.handleCancel.bind(this)}>
          <Text style={styles.statusBarText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }

  handleBarcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) {
      Vibration.vibrate();
    }

    this.setState({
      barcode: e.data,
      text: `${e.data} ($e.type)`,
      type: e.type,
    })
  }

  handleCancel() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }
}

const {width, height} = Dimensions.get('window');
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
