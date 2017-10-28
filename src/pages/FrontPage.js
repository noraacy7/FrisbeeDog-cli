import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  DeviceEventEmitter
} from 'react-native';
import {
  MKButton,
  MKColor,
  MKSpinner
} from 'react-native-material-kit';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import * as Animatable from 'react-native-animatable';
import Main from './Main.js';
import QrCodeScanner from './QrCodeScanner.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';

const RaisedButtonSend1 = MKButton.coloredButton()
  .withBackgroundColor(Theme.defaultTheme.primaryButtonColor)
  .withStyle({
    margin: 10,
    height: 40,
    width: Dimensions.get('window').width * 0.92,
    borderStyle: 'solid',
    borderRadius: 4,
  })
  .build();

const RaisedButtonSend2 = MKButton.coloredButton()
    .withBackgroundColor(Theme.defaultTheme.darkThemeColor)
    .withStyle({
      margin: 10,
      height: 40,
      width: Dimensions.get('window').width * 0.92,
      borderStyle: 'solid',
      borderRadius: 4,
    })
    .build();

const RaisedButtonSend3 = MKButton.coloredButton()
        .withBackgroundColor('transparent')
        .withStyle({
          margin: 10,
          height: 40,
          width: Dimensions.get('window').width * 0.92,
          borderStyle: 'solid',
          borderRadius: 4,
          borderColor: Theme.defaultTheme.borderColor,
          borderWidth: 1.0
        })
        .build();

export default class FrontPage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    // add observer 1st
    DeviceEventEmitter.addListener("barcoderead_frontpage",
    (data) => {
      this.setState({
        TargetAddress: data
      });
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style={{ width: width, height: height }} source={require('../../assets/images/frontpage.png') }>
        </Image>
        <View style={styles1.floatview}>
          <Text style={styles1.letusgetstarted}>Get Started</Text>
          <Text style={styles1.description}>get yourself a local wallet by import from mnemonic or scan from QR code, or create a new one</Text>
          <RaisedButtonSend1 onPress={() => {
            if (this.props.navigator) {
              this.props.navigator.resetTo({
                name: 'Main',
                component: Main
              });
            }
           }}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'normal'}}>
                import wallet from mnemonic
            </Text>
          </RaisedButtonSend1>
          <RaisedButtonSend2 onPress={() => { }}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'normal'}}>
                import wallet from QR code
            </Text>
          </RaisedButtonSend2>
          <Text style={styles1.textor}>-or-</Text>
          <RaisedButtonSend3 onPress={() => { }}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'normal'}}>
                create new wallet
            </Text>
          </RaisedButtonSend3>
          <Text style={styles1.agreement}>By creating or importing an wallet, you are agreening with our Terms & Conditions and Privacy Statement.</Text>
        </View>
      </View>
    )
  }

  handleNavBack() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  floatview: {
    position: 'absolute',
    height: height,
    width: width,
    left: 0,
    top: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  letusgetstarted: {
    backgroundColor: 'transparent',
    fontSize: 36,
    fontFamily: 'Cochin',
    color: '#fff',
  },
  description: {
    backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: 'Cochin',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 80,
  },
  textor: {
    backgroundColor: 'transparent',
    fontSize: 22,
    fontFamily: 'Cochin',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10
  },
  agreement: {
    backgroundColor: 'transparent',
    fontSize: 14,
    fontFamily: 'Cochin',
    color: '#fff',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  }
});
