import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  ScrollView,
  DeviceEventEmitter
} from 'react-native';
import {
  MKButton,
  MKSpinner
} from 'react-native-material-kit';
import Spinner from 'react-native-loading-spinner-overlay';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import ActionSheet from 'react-native-actionsheet';
import * as Animatable from 'react-native-animatable';
import NavigationBar from '../container/NavigationBar.js';
import Gesture from './Gesture.js';
import GestureLocker from '../pages/GestureLocker.js';
import ControlPanel from './ControlPanel.js';
import ScrollViewItem from './ScrollViewItem.js';
import Transactions from './Transactions.js';
import QrCodeScanner from './QrCodeScanner.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';

var addresses = [
  {address: '2N1vKCFx3gF4jYVKfuD9ViuQaHB2ujcbmV9', balance: '0.00000000', updated_time: '2017-09-18 14:28:00'},
  {address: 'mn7yHmxBpV9H5Uatfu8bRpUkqtYsauMsxW', balance: '0.00000000', updated_time: '2017-09-18 14:28:15'},
];

const drawerStyles = {
  drawer: {shadowColor: '#000', shadowOpacity: 0.8, shadowRadius: 15},
  main: {paddingLeft: 3},
}

const FlatButton = MKButton.flatButton()
  .withShadowAniEnabled(false)
  .withStyle({
    flex: 1,
    height: 50,
    borderStyle: 'solid',
    borderColor: Theme.defaultTheme.borderColor,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  })
  .build();

const RaisedButtonSend = MKButton.coloredButton()
  .withBackgroundColor(Theme.defaultTheme.primaryButtonColor)
  .withStyle({
    margin: 10,
    flex: 1,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 4,
  })
  .build();

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      l0calsettings: {},
      tokenName: '',
      coin: 'Bitcoin',
      loading: false,
      showConfirmation: false,
      bottom: -250
    }
  }

  componentDidMount() {
    // get settings and update state properties
    storage.load({
      key: 'l0calsettings'
    }).then((settings) => {
      if (settings.gesture != '' && settings.gesture.length > 0) {
        storage.load({
          key: 'user'
        }).then((user) => {
          if (!user.verify_login) {
            if (this.props.navigator) {
              this.props.navigator.resetTo({
                name: 'GestureLocker',
                component: GestureLocker
              });
            }
          }
        });
      }
      this.setState({l0calsettings: settings});
    }).catch((err) => {});
  }

  renderTaskBox() {
    return(
      <View style={styles1.taskWnd}>
        <View style={styles1.row1}>
          <Text style={styles1.title}>Bitfinex</Text>
          <Text style={styles1.description}>exchange limit, sell, buy, otc and more...</Text>
        </View>
        <View style={styles1.row1}>
          <TextInput style={styles1.inputbox1}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={false}
            numberOfLines = {1}
            editable={false}
            placeholder={'Select your token'}
            onChangeText={() => {

            }}
            value={this.state.tokenName}
          />
          <TouchableOpacity style={{position: 'absolute', right: 20, top: 12, backgroundColor: '#fff'}}
            onPress={
              () => {

              }
            }>
            <Icon name={'md-search'} size={25} color='#ddd' />
          </TouchableOpacity>
        </View>
        <View style={styles1.row2}>
          <TextInput style={[styles1.inputbox2, {marginRight: 5}]}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={true}
            numberOfLines = {2}
            editable={false}
            onChangeText={() => {

            }}
            value={'Begin\n09-12-2017'}
          />
          <TextInput style={[styles1.inputbox2, {marginLeft: 5}]}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={true}
            numberOfLines = {2}
            editable={false}
            onChangeText={() => {

            }}
            value={'End\n10-12-2017'}
          />
        </View>
        <View style={[styles1.row1, {height: 80}]}>
          <Text style={styles1.description}>threshold prices</Text>
          <View style={[styles1.whiteFrame, {height: 50}]}>

          </View>
        </View>
        <View style={[styles1.row1, {height: 80}]}>
          <View style={[styles1.whiteFrame, {height: 70}]}>
            <Text style={[styles1.item, {color: '#999'}]}>Equal per     0.25</Text>
            <View style={{backgroundColor: '#ddd', position: 'absolute', right: width*0.35, top: 20, width: 1, height: 30}}/>
            <Text style={[styles1.item, {}]}>Equal per   0.1</Text>
            <View style={{backgroundColor: '#ddd', position: 'absolute', left: width*0.30, top: 20, width: 1, height: 30}}/>
            <Text style={[styles1.item, {}]}>Every time     50%</Text>
          </View>
        </View>
        <View style={styles1.row2}>
          <RaisedButtonSend onPress={() => {

          }}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Submit
            </Text>
          </RaisedButtonSend>
        </View>
        </View>
    )
  }

  renderConfirmation() {
    if (this.state.showConfirmation) {
      return(
        <Animatable.View ref='confirmationbox' style={styles.confirmWnd}>

        </Animatable.View>
      )
    } else {
      return null
    }
  }

  renderMask() {
    if (this.state.showConfirmation) {
      return(
        <View style={styles1.mask}></View>
      )
    } else {
      return null
    }
  }

  render() {
    return(
      <Drawer ref={(ref) => this._drawer = ref}
        style={drawerStyles}
        content={<ControlPanel />}
        type='displace'
        tapToClose={true}
        openDrawerOffset={0.4}
        side={'right'}
        tweenHandler={
          Drawer.tweenPresets.material
        }
        onClose={
          () => {
            console.log('close');
          }
        }>
        <View style={{flex: 1, backgroundColor: Theme.defaultTheme.defaultBackgroundColor}}>
          <NavigationBar
            rItemImage='md-menu'
            rItemTappedCallback={
              () => {
                this._drawer.open()
              }
            }
          />
          <ScrollView keyboardDismissMode={'on-drag'}>
            {this.renderTaskBox()}
          </ScrollView>
            {this.renderMask()}
            {this.renderConfirmation()}
          <Spinner visible={this.state.loading} />
        </View>
      </Drawer>
    );
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  mask: {
    backgroundColor: 'black',
    opacity: 0.4,
    position: 'absolute',
    left: 0,
    top: 0,
    height: height,
    width: width
  },
  taskWnd: {
    backgroundColor: Theme.defaultTheme.transferWndColor,
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 10,
    width: width,
    height: 400,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  row1: {
    backgroundColor: 'transparent',
    height: 50,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  row2: {
    backgroundColor: 'transparent',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.defaultTheme.transferColor,
  },
  description: {
    fontSize: 14,
    color: Theme.defaultTheme.descriptionColor,
  },
  whiteFrame: {
    backgroundColor: '#fff',
    width: width - 20,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    paddingTop: 8,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 4.0
  },
  item: {
    backgroundColor: 'transparent',
    width: '33.33%',
    fontSize: 16,
    color: '#d9d9dc',
    textAlign: 'left',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  inputbox1: {
    backgroundColor: Theme.defaultTheme.inputEnableBackgroundColor,
    fontSize: 16,
    color: '#999',
    width: width - 20,
    height: 40,
    marginTop: 2.5,
    marginBottom: 2.5,
    paddingLeft: 10,
    paddingRight: 30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1.0,
    borderRadius: 4,
  },
  inputbox2: {
    backgroundColor: Theme.defaultTheme.inputEnableBackgroundColor,
    fontSize: 16,
    color: '#999',
    flex: 1,
    width: width / 2.0 - 10,
    height: 50,
    margin: 10,
    marginTop: 2.5,
    marginBottom: 2.5,
    paddingLeft: 10,
    paddingRight: 40,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1.0,
    borderRadius: 4,
  },
});
