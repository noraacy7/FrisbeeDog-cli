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
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import NavigationBar from '../component/NavigationBar.js';
import Gesture from './Gesture.js';
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
      isVisibleExchangePairSelection: false,
      l0calsettings: {},
      selectedExchangePair: 'BTCUSD',
      bottom: -250,
      startDate: moment(new Date()).format('MM-DD-YYYY HH:mm:ss'),
      endDate: moment(new Date()).format('MM-DD-YYYY HH:mm:ss'),
      startDateHolder: null,
      endDateHolder: null,
      bids: '0.00000000',
      sell: '0.00000000',
      dropdownMenu1: [{value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'}, {value: '8'}, {value: '9'}, {value: '10'}],
      dropdownMenu2: [{value: '1 mins'}, {value: '2 mins'}, {value: '3 mins'}, {value: '5 mins'}],
      dropdownMenu3: [{value: '10%'}, {value: '25%'}, {value: '50%'}, {value: '100%'}],
    };
  }

  componentDidMount() {

  }

  renderTaskBox() {
    return(
      <View style={styles1.taskWnd}>
        <View style={styles1.row1}>
          <Text style={styles1.title}>Bitfinex</Text>
          <Text style={styles1.description}>exchange limit ticker for sell, buy and more...</Text>
        </View>
        <View style={styles1.row1}>
          <TextInput style={styles1.inputbox1}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={false}
            numberOfLines = {1}
            editable={false}
            value={this.state.selectedExchangePair}
          />
          <TouchableOpacity style={{position: 'absolute', right: 20, top: 12, backgroundColor: '#fff'}}
            onPress={
              () => {
                this.setState({
                  isVisibleExchangePairSelection: true
                });
              }
            }>
            <Icon name={'md-search'} size={25} color='#ddd' />
          </TouchableOpacity>
        </View>
        <View style={[styles1.row2]}>
          <View style={[styles1.whiteFrame, {width: width / 2.0 - 20, height: 60, flexDirection: 'row', marginRight: 4}]}>
            <TouchableOpacity activeOpacity={1} onPress={this.handleDatePickerMainFunctionCall.bind(this, 'start')}>
              <View style={[styles1.itemView, {backgroundColor: 'transparent', flexDirection: 'column'}]}>
                <Text style={[styles1.description, {fontSize: 12, color: '#949494'}]}>Begin Task</Text>
                <TextInput style={styles1.inputbox2}
                  underlineColorAndroid='transparent'
                  autoCorrect={false}
                  multiline={false}
                  numberOfLines = {1}
                  editable={false}
                  value={this.state.startDate} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles1.whiteFrame, {width: width / 2.0 - 20, height: 60, flexDirection: 'row', marginLeft: 4}]}>
            <TouchableOpacity activeOpacity={1} onPress={this.handleDatePickerMainFunctionCall.bind(this, 'end')}>
              <View style={[styles1.itemView, {backgroundColor: 'transparent', flexDirection: 'column'}]}>
                <Text style={[styles1.description, {fontSize: 12, color: '#949494'}]}>End Task</Text>
                <TextInput style={styles1.inputbox2}
                  underlineColorAndroid='transparent'
                  autoCorrect={false}
                  multiline={false}
                  numberOfLines = {1}
                  editable={false}
                  value={this.state.endDate} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles1.row1, {height: 100}]}>
          <Text style={styles1.description}>robot will buy and sell automatically</Text>
          <View style={[styles1.whiteFrame, {height: 70, flexDirection: 'row'}]}>
            <View style={[styles1.itemView, {backgroundColor: 'transparent', flexDirection: 'column'}]}>
              <Text style={[styles1.description, {fontSize: 12, color: '#949494'}]}>Bids Price</Text>
              <TextInput style={styles1.inputbox3}
                underlineColorAndroid='transparent'
                autoCorrect={false}
                multiline={false}
                numberOfLines = {1}
                value={this.state.bids}
              />
            </View>
            <View style={[styles1.itemView, {backgroundColor: 'transparent', marginLeft: 35}]}>
              <Text style={[styles1.description, {fontSize: 12, color: '#949494'}]}>Sell Price</Text>
              <TextInput style={styles1.inputbox3}
                underlineColorAndroid='transparent'
                autoCorrect={false}
                multiline={false}
                numberOfLines = {1}
                value={this.state.sell}
              />
            </View>
          </View>
        </View>
        <View style={[styles1.row1, {height: 75}]}>
          <View style={[styles1.whiteFrame, {height: 68}]}>
            <View style={[styles1.itemView, {backgroundColor: 'transparent'}]}>
              <Dropdown
                label='Exchange Times'
                animationDuration={0}
                value={'1'}
                textColor={'#3b5b6a'}
                selectedItemColor={'#3b5b6a'}
                data={this.state.dropdownMenu1} />
            </View>
            <View style={[styles1.itemView, {backgroundColor: 'transparent'}]}>
              <Dropdown
                label='Execute Rate'
                animationDuration={0}
                value={'1 mins'}
                textColor={'#3b5b6a'}
                selectedItemColor={'#3b5b6a'}
                data={this.state.dropdownMenu2} />
            </View>
            <View style={[styles1.itemView, {backgroundColor: 'transparent'}]}>
              <Dropdown
                label='Each Piece'
                animationDuration={0}
                value={'10%'}
                textColor={'#3b5b6a'}
                selectedItemColor={'#3b5b6a'}
                data={this.state.dropdownMenu3} />
            </View>
          </View>
        </View>
        <View style={[styles1.row2, {height: 60}]}>
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

  renderExchangePairSelection() {
    return (
      <View style={styles1.modalContainer}>
        <View style={styles1.row3}>
          <Text>Please select exchange pair</Text>
        </View>
        <View style={styles1.row4}>
          <Swiper
            ref='swiper'
            loadMinimal loadMinimalSize={1}
            loop={false}
            showButtons={true}
            height={270}
            showsPagination={true}
          >
            <ScrollView>
              <View style={styles1.row5}>
                <TouchableOpacity style={styles1.item} onPress={() => {
                  this.setState({
                    isVisibleExchangePairSelection: false
                  })
                }}>
                  <Text>ETHBTC</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <ScrollView>
              <View style={styles1.row5}>
                <TouchableOpacity style={styles1.item} onPress={() => {
                  this.setState({
                    isVisibleExchangePairSelection: false
                  })
                }}>
                  <Text>BTCETH</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <ScrollView>
              <View style={styles1.row5}>
                <TouchableOpacity style={styles1.item} onPress={() => {
                  this.setState({
                    isVisibleExchangePairSelection: false
                  })
                }}>
                  <Text>BTCUSD</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Swiper>
        </View>
      </View>
    )
  }

  render() {
    return (
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
          <Modal isVisible={this.state.isVisibleExchangePairSelection}
            style={styles1.bottomModal}
            onBackdropPress={() => this.setState({ isVisibleExchangePairSelection: false })}>
            {this.renderExchangePairSelection()}
          </Modal>
          <DatePickerDialog ref="DatePickerDialogStart" onDatePicked={this.handleDatePickedFunctionStart.bind(this)} />
          <DatePickerDialog ref="DatePickerDialogEnd" onDatePicked={this.handleDatePickedFunctionEnd.bind(this)} />

          </View>
      </Drawer>
    );
  }

  handleActionSheet1(i) {
    console.log(">>>> you select: " + i);
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
      startDate: moment(date).format('MM-DD-YYYY HH:mm:ss')
    });
  }

  handleDatePickedFunctionEnd = (date) => {
    this.setState({
      endDate: moment(date).format('MM-DD-YYYY HH:mm:ss')
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
    backgroundColor: Theme.defaultTheme.taskWndColor,
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 10,
    width: width,
    height: 422,
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.defaultTheme.primaryTextColor,
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
    color: Theme.defaultTheme.primaryTextColor,
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
    fontSize: 14,
    color: Theme.defaultTheme.primaryTextColor,
    flex: 1,
    width: width / 2.0 - 40,
    height: 50,
    paddingLeft: -10,
    paddingRight: 0,
    borderStyle: 'solid',
    borderColor: '#C4C3C4',
    borderWidth: 0,
    borderBottomWidth: 0.5,
  },
  inputbox3: {
    backgroundColor: Theme.defaultTheme.inputEnableBackgroundColor,
    fontSize: 16,
    color: Theme.defaultTheme.primaryTextColor,
    flex: 1,
    width: width / 2.0 - 40,
    height: 50,
    paddingLeft: -10,
    paddingRight: 0,
    borderStyle: 'solid',
    borderColor: '#C4C3C4',
    borderWidth: 0,
    borderBottomWidth: 0.5,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row3: {
    backgroundColor: '#f0f0f0',
    height: 50,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  row4: {
    backgroundColor: '#fff',
    height: 270,
  },
  row5: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  item: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 6,
    borderStyle: 'solid',
    borderColor: '#C4C3C4',
    borderWidth: 1.0,
    borderRadius: 4,
  }
});
