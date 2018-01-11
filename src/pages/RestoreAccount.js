import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {
  MKButton,
  MKColor,
  MKSpinner
} from 'react-native-material-kit';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import NavigationBar from '../component/NavigationBar.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';
import {
  connect
} from 'react-redux';
import * as createNewAccount from '../actions/createNewAccount.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import Main from './Main.js';

class RestoreAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input_mnemonic: ''
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar title={'Restore Account'}
          lItemImage='md-arrow-back'
          lItemTappedCallback={this.handleNavBack.bind(this)}/>
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <Text style={styles1.description}>Please enter the words you just wrote down, one after another, to make sure that everything is backed up correctly.</Text>
          <TextInput style={styles1.inputboxMnemonic}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={true}
            numberOfLines = {4}
            value={this.state.input_mnemonic}
            onChange={(event) => {
              this.setState({
                input_mnemonic: event.nativeEvent.text
              })
            }}
          />
          <Animatable.View style={[styles1.confirmWnd, {}]}>
            <View>
              <View style={[styles.line, {flexDirection: 'row', justifyContent: 'space-between', padding: 5, borderColor: 'transparent'}]}>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    input_mnemonic: ''
                  })
                }}>
                  <Text style={styles.boldtext}>RESET</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if (this.props.mnemonic == this.state.input_mnemonic) {
                    this.props.navigator.push({
                      name: 'Main',
                      component: Main
                    });
                  } else {
                    this.refs.toast.show('mnemonic is not found, please try again', DURATION.LENGTH_SHORT);
                  }
                }}>
                  <Text style={styles.boldtext}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </View>
        <Toast ref="toast"/>
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
  description: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: Theme.defaultTheme.normalTextColor,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  inputboxMnemonic: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: Theme.defaultTheme.importantTextColor,
    width: width - 20,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 30,
    borderStyle: 'solid',
    borderColor: '#999',
    borderWidth: 0.5,
    borderRadius: 4,
  },
  confirmWnd: {
    backgroundColor: Theme.defaultTheme.themeColor,
    opacity: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
});

export default connect(
  (state) => ({
    //status: state.createNewAccount.status,
  }),
  (dispatch) => ({

  })
)(RestoreAccount);
