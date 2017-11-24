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

const PlainButton = MKButton.plainFab()
  .withStyle({
    alignSelf: 'center',
    marginBottom: 10
  })
  .build();

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      l0calsettings: {},
      TargetAddress: '',
      coin: 'Bitcoin',
      loading: false,
      showConfirmation: false,
      bottom: -250
    }
  }

  componentDidMount() {
    // add observer 1st
    DeviceEventEmitter.addListener("barcoderead",
    (data) => {
      this.setState({
        TargetAddress: data
      });
    });
    // add observer 2nd
    DeviceEventEmitter.addListener("coinchanged",
    (data) => {
      this._drawer.close();
      if (this.state.coin != data) {
        this.setState({
          coin: data,
          loading: true,
        });
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 1000);
      }
    });
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

  renderSuggestion() {
    if (this.state.l0calsettings['suggestion_of_gesture_hide'] == false) {
      return(
        <Animatable.View ref='suggestionbox' style={styles.infoWnd}>
          <View style={styles.suggestionBox1}>
            <Image source={require('../../assets/images/green_shield.png')}
              style={{width: 27, height: 27}}/>
            <Text style={styles.suggestionText}>Need an unlock gesture for safe?</Text>
          </View>
          <View style={styles.suggestionBox2}>
            <FlatButton
              onPress={() => {
                this.refs.suggestionbox.fadeOut(1000).then((endState) => {
                  if (endState.finished) {
                    var settings = this.state.l0calsettings;
                    settings['suggestion_of_gesture_hide'] = true;
                    this.setState({
                      l0calsettings: settings,
                    });
                    storage.save({
                      key: 'l0calsettings',
                      data: settings
                    });
                  }
                });
              }}>
              <Text pointerEvents="none"
                style={{color: Theme.defaultTheme.darkThemeColor, fontSize: 16, fontWeight: 'normal'}}>
                  No, thanks
              </Text>
            </FlatButton>
            <FlatButton
              onPress={() => {
                var settings = this.state.l0calsettings;
                settings['suggestion_of_gesture_hide'] = true;
                this.setState({
                  l0calsettings: settings,
                });
                if (this.props.navigator) {
                  this.props.navigator.push({
                    name: 'Gesture',
                    component: Gesture
                  });
                }
              }}>
              <Text pointerEvents="none"
                style={{color: Theme.defaultTheme.darkThemeColor, fontSize: 16, fontWeight: 'normal'}}>
                  Go ahead
              </Text>
            </FlatButton>
          </View>
        </Animatable.View>
      )
    } else {
      return null
    }
  }

  renderTransfer() {
    return(
      <View style={styles.transferWnd}>
        <View style={styles.row1}>
          <Text style={styles.title}>BTC Transfer</Text>
          <Text style={styles.description}>total balance is: $586.18</Text>
        </View>
        <View style={styles.row1}>
          <TextInput style={styles.inputbox1}
            underlineColorAndroid='transparent'
            placeholder={'Target Address'}
            onChangeText={() => {
              this.setState({
                TargetAddress: ''
              })
            }}
            value={this.state.TargetAddress}
          />
          <TouchableOpacity style={{position: 'absolute', right: 20, top: 17, backgroundColor: '#fff'}}
            onPress={
              () => {
                if (this.props.navigator) {
                  this.props.navigator.push({
                    name: 'QrCodeScanner',
                    component: QrCodeScanner,
                  });
                }
              }
            }>
            <Icon name={'md-qr-scanner'} size={25} color='#ddd' />
          </TouchableOpacity>
        </View>
        <View style={styles.row2}>
          <TextInput style={[styles.inputbox2, {}]}
            underlineColorAndroid='transparent'
            placeholder={'Amount'}
            onChangeText={() => {

            }}
          />
          <TextInput style={[styles.inputbox2, {backgroundColor: Theme.defaultTheme.inputDisableBackgroundColor, color: 'darkgray'}]}
            underlineColorAndroid='transparent'
            editable={false}
            value={"0.0001"}
            onChangeText={() => {

            }}
          />
        </View>
        <View style={styles.row2}>
          <RaisedButtonSend onPress={this.handleSend.bind(this)}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Send
            </Text>
          </RaisedButtonSend>
        </View>
        </View>
    )
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

  renderConfirmation() {
    if (this.state.showConfirmation) {
      return(
        <Animatable.View ref='confirmationbox' style={styles1.confirmWnd}>
          <View style={styles1.line}>
            <Text style={styles1.text}>SEND CONFIRMATION</Text>
          </View>
          <View style={styles1.line}>
            <Text style={styles1.text}>Send 0.11458679 BTC</Text>
          </View>
          <View style={styles1.line}>
            <Text style={styles1.text}>Receiving Address</Text>
            <Text style={styles1.smalltext}>mn7yHmxBpV9H5Uatfu8bRpUkqtYsauMsxW</Text>
          </View>
          <View style={styles1.line}>
            <Text style={styles1.text}>Mining Fee: 0.0034126 BTC</Text>
            <Text style={styles1.smalltext}>BTC mining fee can be adjusted in personal settings menu</Text>
          </View>
          <View style={styles1.line}>
            <View style={[styles1.line, {flexDirection: 'row', justifyContent: 'space-between', padding: 5}]}>
              <TouchableOpacity onPress={() => {
                this.refs.confirmationbox.fadeOut(100).then((endState) => {
                  if (endState.finished) {
                    this.setState({
                      showConfirmation: false
                    });
                  }
                });
              }}>
                <Text style={styles1.boldtext}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.refs.confirmationbox.fadeOut(100).then((endState) => {
                  if (endState.finished) {
                    this.setState({
                      showConfirmation: false
                    });
                  }
                });
              }}>
                <Text style={styles1.boldtext}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
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
              {this.renderSuggestion()}
              {this.renderTransfer()}
              <View style={styles.outline}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#999'}}>Addresses</Text>
                <TouchableOpacity onPress={
                  () => {
                    if (this.props.navigator) {
                      this.props.navigator.push({
                        name: 'Transactions',
                        component: Transactions,
                        params: {
                          cointype: 'Bitcoin'
                        },
                      });
                    }
                  }
                }>
                  <Text style={{fontSize: 14, fontWeight: 'bold', color: Theme.defaultTheme.dangerColor}}>new</Text>
                </TouchableOpacity>
              </View>
              {
                addresses.map((item, i) => {
                  return(
                    <ScrollViewItem
                      key={i}
                      address={item}
                      onCopy={() => this.handleCopy(i)}
                      onRefresh={() => this.handleRefresh(i)}>
                    </ScrollViewItem>
                  )
                })
              }
              <PlainButton
                onPress={() => {
                  console.log('click plain button');
                  this.ActionSheet.show();
                }}>
                <Image pointerEvents="none" source={require('../../assets/images/plus.png')} />
              </PlainButton>
            </ScrollView>
            {this.renderMask()}
            {this.renderConfirmation()}
            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={'I want more'}
              options={['cancel', 'create new address']}
              cancelButtonIndex={0}
              destructiveButtonIndex={4}
              onPress={this.handleActionSheet}
            />
            <Spinner visible={this.state.loading} />
        </View>
      </Drawer>
    );
  }

  handleSend() {
    this.setState({
      showConfirmation: true
    });
  }

  handleActionSheet(i) {
    console.log(">>>> you select: " + i);
  }

  handleCopy(i) {
    console.log(">>>> you select: " + i);
  }

  handleRefresh(i) {
    console.log(">>>> you select: " + i);
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
  confirmWnd: {
    backgroundColor: '#FCBA42',
    opacity: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 250,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  line: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 50,
    borderColor: Theme.defaultTheme.borderColor,
    borderStyle: 'solid',
    borderBottomWidth: 1.0,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  },
  smalltext: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#fff'
  },
  boldtext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});
