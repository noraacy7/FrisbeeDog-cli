import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import {
  MKButton,
  MKColor,
  MKSpinner
} from 'react-native-material-kit';
import DeviceInfo from 'react-native-device-info';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import ActionSheet from 'react-native-actionsheet';
import * as Animatable from 'react-native-animatable';
import NavigationBar from '../container/NavigationBar.js';
import ControlPanel from './ControlPanel.js';
import ScrollViewItem from './ScrollViewItem.js';
import AddressList from './AddressList.js';
import QrCodeScanner from './QrCodeScanner.js';
import styles from '../../stylesheet.js';

var addresses = [
  {address: '2N1vKCFx3gF4jYVKfuD9ViuQaHB2ujcbmV9', balance: '0.00000000', updated_time: '2017-09-18 14:28:00'},
  {address: 'mn7yHmxBpV9H5Uatfu8bRpUkqtYsauMsxW', balance: '0.00000000', updated_time: '2017-09-18 14:28:15'},
];

const FlatButton = MKButton.flatButton()
  .withShadowAniEnabled(false)
  .withStyle({
    flex: 1,
    height: 50,
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  })
  .build();

const RaisedButtonSend = MKButton.coloredButton()
  .withBackgroundColor('#74c948')
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
      isDisplaySuggestion: true,
    }
  }

  componentDidMount() {
    console.log(DeviceInfo.getUniqueID());
  }

  render() {
    // check local storage if should display suggestion box
    var isDisplaySuggestion = {};

      return(
        <Drawer ref={(ref) => this._drawer = ref}
          content={<ControlPanel />}
          type='overlay'
          tapToClose={true}
          openDrawerOffset={0.5}
          side={'right'}
          tweenHandler={Drawer.tweenPresets.material}
          onClose={
            () => {
              console.log('close');
            }
          }>

          <View style={{flex: 1}}>
            <NavigationBar
              rItemImage='md-menu'
              rItemTappedCallback={this.handleDrawerOpen.bind(this)}
            />
            <ScrollView keyboardDismissMode={'on-drag'}>
              {
                this.state.isDisplaySuggestion ?
                <Animatable.View style={styles1.infoWnd}
                  ref='suggestion'>
                  <View style={styles1.suggestionBox1}>
                    <Image source={require('../../assets/images/green_shield.png')}
                      style={{width: 27, height: 27}}/>
                    <Text style={styles1.suggestionText}>Need an unlock gesture?</Text>
                  </View>
                  <View style={styles1.suggestionBox2}>
                    <FlatButton
                      onPress={() => {
                        this.refs.suggestion.fadeOut(1000).then((endState) => {
                          if (endState.finished) {
                            this.setState({
                              isDisplaySuggestion: false,
                            })
                          }
                        });
                      }}>
                      <Text pointerEvents="none"
                        style={{color: '#3188c9', fontSize: 16, fontWeight: 'bold'}}>
                          No, thanks
                      </Text>
                    </FlatButton>
                    <FlatButton
                      onPress={() => {

                      }}>
                      <Text pointerEvents="none"
                        style={{color: '#3188c9', fontSize: 16, fontWeight: 'bold'}}>
                          Go ahead
                      </Text>
                    </FlatButton>
                  </View>
                </Animatable.View> : null
              }
              <View style={styles1.transferwnd}>
                <View style={styles1.row1}>
                  <Text style={styles1.title}>Transfer</Text>
                  <Text style={styles1.description}>your current balance is: 3.06908454</Text>
                </View>
                <View style={styles1.row1}>
                  <TextInput style={styles1.inputbox1}
                    placeholder={'Target Address'}
                    onChangeText={() => {

                    }}
                  />
                  <TouchableOpacity style={{position: 'absolute', right: 20, top: 17, backgroundColor: '#fff'}}
                    onPress={this.handlePressQrScanner.bind(this)}>
                    <Icon name={'md-qr-scanner'} size={25} color='#ddd' />
                  </TouchableOpacity>
                </View>
                <View style={styles1.row2}>
                  <TextInput style={[styles1.inputbox2, {}]}
                    placeholder={'Amount'}
                    onChangeText={() => {

                    }}
                  />
                  <TextInput style={[styles1.inputbox2, {backgroundColor: 'lightgray', color: 'darkgray'}]}
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
                <TouchableOpacity onPress={this.handleSeeall.bind(this)}>
                  <Text style={{fontSize: 14, fontWeight: 'bold', color: '#e0482f'}}>see all</Text>
                </TouchableOpacity>
              </View>
              {
                addresses.map((item, i) => {
                  return(
                    <ScrollViewItem
                      key={i}
                      address={item}
                      onCopy={() => this.handleCopy(i)}
                      onRefresh={() => this.handleRefresh(i)}
                      onTransactionHistory={() => this.handleTransactionHistory(i)}>
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
          title={'Add another address'}
          options={['Cancel', 'import from my account', 'create address']}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={this.handleActionSheet}
        />
      </View>
    </Drawer>
    );
  }

  handleDrawerOpen() {
    this._drawer.open();
  }

  handlePressQrScanner() {
    if (this.props.navigator) {
      this.props.navigator.push({
        name: 'QrCodeScanner',
        component: QrCodeScanner,
      });
    }
  }

  handleSeeall() {
    if (this.props.navigator) {
      this.props.navigator.push({
        name: 'AddressList',
        component: AddressList,
        params: {
          cointype: 'BTC'
        },
      });
    }
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

  handleTransactionHistory(i) {
    console.log(">>>> you select: " + i);
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  infoWnd: {
    backgroundColor: '#fff',
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
    borderColor: '#f0f0f0',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  suggestionText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999'
  },
  suggestionBox2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  transferwnd: {
    backgroundColor: '#f49422',
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
    color: '#3b5b6a'
  },
  description: {
    fontSize: 14,
    color: '#3188c9'
  },
  inputbox1: {
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
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
