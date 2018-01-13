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
  MKIconToggle
} from 'react-native-material-kit';
import {
  Loading,
  EasyLoading
} from 'react-native-easy-loading';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import NavigationBar from '../component/NavigationBar.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';
import DeviceInfo from 'react-native-device-info';
import {
  connect
} from 'react-redux';
import * as createNewAccount from '../actions/createNewAccount.js';
import * as createNewAccountActive from '../actions/createNewAccountActive.js';
import Toast, {DURATION} from 'react-native-easy-toast';
import Main from './Main.js';

const MnemonicWordButton = MKButton.coloredButton()
  .withBackgroundColor('#fff')
  .withStyle({
    margin: 10,
    padding: 6,
  })
  .build();

class CreateNewAccountActive extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input_mnemonic: '',
      mnemonic_words: []
    }
  }

  componentDidMount() {
    let words = this.props.mnemonic.split(" ");
    for (let i = 0; i < words.length; i++) {
      var j = parseInt(Math.random() * (words.length - i));
      var tmp = words[j];
      words[j] = words[words.length - i - 1];
      words[words.length - i - 1] = tmp;
    }
    this.setState({
      mnemonic_words: words
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.status === 'processing') {
      EasyLoading.show('Loading...', 3000); // show loading
      return true;
    } else if (nextProps.status === 'done') {
      EasyLoading.dismis(); // dismis loading
      storage.save({
        key: 'user',
        data: {
          mnemonic: this.state.input_mnemonic
        }
      });
      this.props.navigator.push({
        name: 'Main',
        component: Main
      });
      return false;
    }
    return true;
  }

  renderMnemonicWords() {
    let subviews = [];
    for (let i = 0; i < this.state.mnemonic_words.length; i++) {
      let subview = (
        <MnemonicWordButton
          key={i}
          onPress={() => {
            let input_mnemonic = this.state.input_mnemonic;
            if (input_mnemonic.length <= 0) {
              input_mnemonic += this.state.mnemonic_words[i].toString()
            } else {
              input_mnemonic += " " + this.state.mnemonic_words[i].toString()
            }
            this.setState({
              input_mnemonic: input_mnemonic
            });
        }}>
          <Text>{this.state.mnemonic_words[i]}</Text>
        </MnemonicWordButton>
      )
      subviews.push(subview);
    }
    return(
      <View style={styles1.row}>
        {subviews}
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar title={'Mnemonic Check'}
          lItemImage='md-arrow-back'
          lItemTappedCallback={this.handleNavBack.bind(this)}/>
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <Text style={styles1.description}>Please enter the words you just wrote down, one after another, to make sure that everything is backed up correctly.</Text>
          <TextInput style={styles1.inputboxMnemonic}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={true}
            numberOfLines = {4}
            editable={false}
            value={this.state.input_mnemonic}
            onChange={(event) => {
              this.setState({
                input_mnemonic: event.nativeEvent.text
              })
            }}
          />
          {this.renderMnemonicWords()}
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
                    this.props.createNewAccountActive(this.props.mnemonic, this.props.wid, DeviceInfo.getUniqueID());
                  } else {
                    this.refs.toast.show('not correct', DURATION.LENGTH_SHORT);
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
  row: {
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default connect(
  (state) => ({
    mnemonic: 'labor maze tip include illegal solve renew crack truth wage chest walk', //state.createNewAccount.mnemonic,
    wid: 'cd3e90b8-3574-4c68-8891-443e4bc5dac4', //state.createNewAccount.wid,
    status: state.createNewAccountActive.status
  }),
  (dispatch) => ({
    createNewAccountActive: (mnemonic, wid, deviceno) => dispatch(createNewAccountActive.exec(mnemonic, wid, deviceno)),
  })
)(CreateNewAccountActive);
