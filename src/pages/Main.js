import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
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
  })
  .build();

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      l0calsettings: {},
      TargetAddress: '',
      coin: 'Bitcoin',
      loading: false
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
        <View style={{flex: 1}}>
          <NavigationBar
            rItemImage='md-menu'
            rItemTappedCallback={
              () => {
                this._drawer.open()
              }
            }
          />
          <ScrollView keyboardDismissMode={'on-drag'}>
            {
              !this.state.l0calsettings['suggestion_of_gesture_hide'] ?
              <Animatable.View style={styles1.infoWnd}
                ref='suggestion'>
                <View style={styles1.suggestionBox1}>
                  <Image source={require('../../assets/images/green_shield.png')}
                    style={{width: 27, height: 27}}/>
                  <Text style={styles1.suggestionText}>Need an unlock gesture for safe?</Text>
                </View>
                <View style={styles1.suggestionBox2}>
                  <FlatButton
                    onPress={() => {
                      this.refs.suggestion.fadeOut(1000).then((endState) => {
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
              </Animatable.View> : null
            }
            <View style={styles1.transferWnd}>
              <View style={styles1.row1}>
                <Text style={styles1.title}>Transfer</Text>
                <Text style={styles1.description}>total balance is: $386.18</Text>
              </View>
              <View style={styles1.row1}>
                <TextInput style={styles1.inputbox1}
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
              <View style={styles1.row2}>
                <TextInput style={[styles1.inputbox2, {}]}
                  placeholder={'Amount'}
                  onChangeText={() => {

                  }}
                />
                <TextInput style={[styles1.inputbox2, {backgroundColor: Theme.defaultTheme.inputDisableBackgroundColor, color: 'darkgray'}]}
                  editable={false}
                  value={"0.0001"}
                  onChangeText={() => {

                  }}
                />
              </View>
              <View style={styles1.row2}>
                <RaisedButtonSend
                  onPress={() => {

                  }}>
                  <Text pointerEvents="none"
                    style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                      Send
                  </Text>
                </RaisedButtonSend>
              </View>
              </View>
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
                  <Text style={{fontSize: 14, fontWeight: 'bold', color: Theme.defaultTheme.dangerColor}}>transactions</Text>
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
              this.ActionSheet.show();
            }}>
            <Image pointerEvents="none" source={require('../../assets/images/plus.png')} />
          </PlainButton>
        </ScrollView>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Add more addresses'}
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
  infoWnd: {
    backgroundColor: Theme.defaultTheme.infoWndColor,
    marginTop: 16,
    marginBottom: 16,
    width: width,
    height: 100,
    flex: 1,
    flexDirection: 'column',
    borderStyle: 'solid',
    borderColor: '#f5f5f5',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  suggestionBox1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Theme.defaultTheme.borderColor,
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  suggestionText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#999'
  },
  suggestionBox2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Theme.defaultTheme.borderColor,
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  transferWnd: {
    backgroundColor: Theme.defaultTheme.transferWndColor,
    marginTop: 0,
    marginBottom: 10,
    width: width,
    height: 240,
    flex: 1,
    flexDirection: 'column',
  },
  row1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row2: {
    flex: 1,
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
  inputbox1: {
    backgroundColor: Theme.defaultTheme.inputEnableBackgroundColor,
    flex: 1,
    width: width - 20,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1.0,
    borderRadius: 4,
  },
  inputbox2: {
    backgroundColor: Theme.defaultTheme.inputEnableBackgroundColor,
    flex: 1,
    width: width / 2.0 - 20,
    height: 40,
    margin: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 40,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1.0,
    borderRadius: 4,
  },
});
