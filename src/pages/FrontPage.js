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
import Toast, {DURATION} from 'react-native-easy-toast';
import {
  Loading,
  EasyLoading
} from 'react-native-easy-loading';
import QrCodeScanner from './QrCodeScanner.js';
import CreateNewAccount from './CreateNewAccount.js';
import GestureLocker from '../pages/GestureLocker.js';
import Main from './Main.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';
import {
  connect
} from 'react-redux';
import * as createNewAccount from '../actions/createNewAccount.js';

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

class FrontPage extends Component {

  constructor(props) {
    super(props);
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.status === 'processing') {
      EasyLoading.show('Loading...', 3000); // show loading
    } else if (nextProps.status === 'done' && nextProps.mnemonic != '') {
      EasyLoading.dismis(); // dismis loading
      this.props.navigator.push({
        name: 'CreateNewAccount',
        component: CreateNewAccount
      });
    } else {
      if (nextProps.error) {
        this.refs.toast.show(nextProps.error, DURATION.LENGTH_SHORT);
      }
    }
    return true;
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style={{ width: width, height: height }} source={require('../../assets/images/frontpage.png') }>
        </Image>
        <View style={styles1.floatview}>
          <Text style={styles1.letusgetstarted}>Get Started</Text>
          <Text style={styles1.description}>get yourself a local wallet by import from mnemonic or scan from QR code, or create a new one</Text>
          <RaisedButtonSend1 onPress={this.handleRaisedButtonSend1.bind(this)}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'normal'}}>
                restore account from mnemonic
            </Text>
          </RaisedButtonSend1>
          <RaisedButtonSend2 onPress={this.handleRaisedButtonSend2.bind(this)}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'normal'}}>
                restore account from QR code
            </Text>
          </RaisedButtonSend2>
          <Text style={styles1.textor}>-or-</Text>
          <RaisedButtonSend3 onPress={this.handleRaisedButtonSend3.bind(this)}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'normal'}}>
                create new account
            </Text>
          </RaisedButtonSend3>
          <Text style={styles1.agreement}>By creating or restoring an account, you are agreening with our Terms & Conditions and Privacy Statement.</Text>
        </View>
        <Loading />
      </View>
    )
  }

  handleRaisedButtonSend1() {

  }

  handleRaisedButtonSend2() {

  }

  handleRaisedButtonSend3() {
    this.props.createNewAccount();
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

export default connect(
  (state) => ({
    status: state.createNewAccount.status,
    mnemonic: state.createNewAccount.mnemonic,
    error: state.createNewAccount.error,
  }),
  (dispatch) => ({
    createNewAccount: () => dispatch(createNewAccount.exec()),
  })
)(FrontPage);
