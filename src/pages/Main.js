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
  MKSpinner,
  MKSlider,
  MKRangeSlider,
  setTheme
} from 'react-native-material-kit';
import {
  DatePickerDialog
} from 'react-native-datepicker-dialog';
import {
  Dropdown
} from 'react-native-material-dropdown';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import ActionSheet from 'react-native-actionsheet';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import NavigationBar from '../component/NavigationBar.js';
import Gesture from './Gesture.js';
import GestureLocker from '../pages/GestureLocker.js';
import ControlPanel from './ControlPanel.js';
import ScrollViewItem from './ScrollViewItem.js';
import Transactions from './Transactions.js';
import QrCodeScanner from './QrCodeScanner.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';

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

setTheme({
  primaryColor: '#3c97e9',
});

class SliderValuedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curValue: props.initial,
    };
  }

  onChange(curValue) {
    this.setState({curValue});
  }

  render() {
    return (
      <Text style={styles1.sliderText}>
        {this.state.curValue}
      </Text>
    );
  }
}

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showConfirmation: false,
      l0calsettings: {},
      tokenName: 'BTCUSD',
      bottom: -250,
      startDate: moment(new Date()).format('DD-MM-YYYY'),
      endDate: moment(new Date()).format('DD-MM-YYYY'),
      startDateHolder: null,
      endDateHolder: null,
      dropdownMenu1: [{
        value: '1',
      }, {
        value: '2',
      }, {
        value: '3',
      }, {
        value: '4',
      }, {
        value: '5',
      }, {
        value: '6',
      }, {
        value: '7',
      }, {
        value: '8',
      }, {
        value: '9',
      }, {
        value: '10',
      }],
      dropdownMenu2: [{
        value: '1 mins',
      }, {
        value: '2 mins',
      }, {
        value: '3 mins',
      }, {
        value: '5 mins',
      }],
      dropdownMenu3: [{
        value: '10%',
      }, {
        value: '25%',
      }, {
        value: '50%',
      }, {
        value: '100%',
      }]
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

  renderMask() {
    if (this.state.showConfirmation) {
      return(
        <View style={styles1.mask}></View>
      )
    } else {
      return null
    }
  }

  renderTaskBox() {
    return(
      <View style={styles1.taskWnd}>
        <View style={styles1.row1}>
          <Text style={styles1.title}>Bitfinex</Text>
          <Text style={styles1.description}>exchange limit, sell, buy and more...</Text>
        </View>
        <View style={styles1.row1}>
          <TextInput style={styles1.inputbox1}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={false}
            numberOfLines = {1}
            editable={false}
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
          <TouchableOpacity activeOpacity={1} onPress={this.handleDatePickerMainFunctionCall.bind(this, 'start')}>
            <TextInput style={[styles1.inputbox2, {marginRight: 0}]}
              underlineColorAndroid='transparent'
              autoCorrect={false}
              multiline={true}
              numberOfLines = {2}
              editable={false}
              onChangeText={() => {

              }}
              value={'Begin\n' + this.state.startDate} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={this.handleDatePickerMainFunctionCall.bind(this, 'end')}>
            <TextInput style={[styles1.inputbox2, {marginLeft: 0}]}
              underlineColorAndroid='transparent'
              autoCorrect={false}
              multiline={true}
              numberOfLines = {2}
              editable={false}
              onChangeText={() => {

              }}
              value={'End\n' + this.state.endDate} />
          </TouchableOpacity>
        </View>
        <View style={[styles1.row1, {height: 100}]}>
          <Text style={styles1.description}>current price: 16,542.000</Text>
          <View style={[styles1.whiteFrame, {height: 75, flexDirection: 'column'}]}>
            <SliderValuedText ref="rangeValueText" initial="bids: 20.1847, and sell: 80.2847" rangeText="" />
            <MKRangeSlider
              ref="rangeSlider"
              min={0}
              max={1000000}
              minValue={200000}
              maxValue={500000}
              style={styles1.slider}
              onChange={(curValue) => this.refs.rangeValueText.onChange('bids: ' + (curValue.min/10000.0).toFixed(3) + ', and sell: ' + (curValue.max/10000.0).toFixed(3))}
              />
          </View>
        </View>
        <View style={[styles1.row1, {height: 75}]}>
          <View style={[styles1.whiteFrame, {height: 68}]}>
            <View style={[styles1.itemView, {backgroundColor: 'transparent'}]}>
              <Dropdown
                label='Exchange Times'
                animationDuration={0}
                value={'1'}
                data={this.state.dropdownMenu1} />
            </View>
            <View style={[styles1.itemView, {backgroundColor: 'transparent'}]}>
              <Dropdown
                label='Execute Rate'
                animationDuration={0}
                value={'1 mins'}
                data={this.state.dropdownMenu2} />
            </View>
            <View style={[styles1.itemView, {backgroundColor: 'transparent'}]}>
              <Dropdown
                label='Each Piece'
                animationDuration={0}
                value={'10%'}
                data={this.state.dropdownMenu3} />
            </View>
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
          <DatePickerDialog ref="DatePickerDialogStart" onDatePicked={this.handleDatePickedFunctionStart.bind(this)} />
          <DatePickerDialog ref="DatePickerDialogEnd" onDatePicked={this.handleDatePickedFunctionEnd.bind(this)} />
        </View>
      </Drawer>
    );
  }

  handleDatePickerMainFunctionCall = (category) => {
    let StartDateHolder = this.state.startDateHolder;
    if (!StartDateHolder || StartDateHolder == null) {
      StartDateHolder = new Date();
      this.setState({
        startDateHolder: StartDateHolder
      });
    }
    let EndDateHolder = this.state.endDateHolder;
    if (!EndDateHolder || EndDateHolder == null) {
      EndDateHolder = new Date();
      this.setState({
        endDateHolder: EndDateHolder
      });
    }
    //To open the dialog
    if (category === 'start') {
      this.refs.DatePickerDialogStart.open({
        date: StartDateHolder,
        minDate: StartDateHolder
      });
    } else {
      this.refs.DatePickerDialogEnd.open({
        date: EndDateHolder,
        minDate: StartDateHolder
      });
    }
  }

  handleDatePickedFunctionStart = (date) => {
    this.setState({
      startDate: moment(date).format('DD-MM-YYYY')
    });
  }

  handleDatePickedFunctionEnd = (date) => {
    this.setState({
      endDate: moment(date).format('DD-MM-YYYY')
    });
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
    height: 428,
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
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  itemView: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: -10,
    marginRight: 5,
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
    width: width / 2.0 - 15,
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
  slider: {
    width: width - 20,
  },
  sliderText: {
    fontSize: 14,
    color: Theme.defaultTheme.normalTextColor,
  }
});
