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
  setTheme
} from 'react-native-material-kit';
import {
  DatePickerDialog
} from 'react-native-datepicker-dialog';
import {
  Loading,
  EasyLoading
} from 'react-native-easy-loading';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast, {DURATION} from 'react-native-easy-toast';
import moment from 'moment';
import Drawer from 'react-native-drawer';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import NavigationBar from '../component/NavigationBar.js';
import TaskBox from '../component/TaskBox.js';
import ControlPanel from '../component/ControlPanel.js';
import Gesture from './Gesture.js';
import ScrollViewItem from './ScrollViewItem.js';
import Transactions from './Transactions.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';
import {
  connect
} from 'react-redux';
import * as initApp from '../actions/initApp.js';
import * as inputTaskBox from '../actions/inputTaskBox.js';

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

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showExchangePairSelection: false,
      startDateHolder: null,
      endDateHolder: null,
    };
  }

  componentDidMount() {
    this.props.startInitApp();
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Main init_status: ' + nextProps.init_status);
    if (nextProps.init_status === 'processing') {
      EasyLoading.show('Loading...', 3000); // show loading
    } else if (nextProps.init_status === 'done') {
      EasyLoading.dismis(); // dismis loading
    } else {
      if (nextProps.error) {
        this.refs.toast.show(nextProps.error, DURATION.LENGTH_SHORT);
      }
    }
    return true;
  }

  renderExchangePairSelection() {
    return (
      <View style={styles1.modalContainer}>
        <View style={styles1.row3}>
          <Text>Please select exchange pair</Text>
          <TouchableOpacity onPress={() => {

          }}>
            <Text style={{color: 'red'}}>Done</Text>
          </TouchableOpacity>
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
                    showExchangePairSelection: false
                  })
                  this.props.setExchangePair('ETHBTC')
                }}>
                  <Text>ETHBTC</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <ScrollView>
              <View style={styles1.row5}>
                <TouchableOpacity style={styles1.item} onPress={() => {
                  this.setState({
                    showExchangePairSelection: false
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
                    showExchangePairSelection: false
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
            <TaskBox ref="taskbox"
              chooseExchangePairCallback={
                () => {
                  this.setState({
                    showExchangePairSelection: true
                  })
                }
              }
              chooseBeginDateCallback={
                () => this.handleDatePickerMainFunctionCall('start')
              }
              chooseEndDateCallback={
                () => this.handleDatePickerMainFunctionCall('end')
              }
              sendCallback={
                () => {
                  console.log(`title:${this.props.title}, description:${this.props.description}, pair:${this.props.exchangePair}, start:${this.props.startDate}, end:${this.props.endDate}, bids:${this.props.bids}, sell:${this.props.sell}, exchange_times:${this.props.exchange_times}, execute_rate:${this.props.execute_rate}, each_piece:${this.props.each_piece}`)
                }
              } />
          </ScrollView>
          <Modal isVisible={this.state.showExchangePairSelection}
            style={styles1.bottomModal}
            onBackdropPress={
              () => this.setState({
                showExchangePairSelection: false
              })
            }>
            {this.renderExchangePairSelection()}
          </Modal>
          <DatePickerDialog ref="DatePickerDialogStart" onDatePicked={this.handleDatePickedFunctionStart.bind(this)} />
          <DatePickerDialog ref="DatePickerDialogEnd" onDatePicked={this.handleDatePickedFunctionEnd.bind(this)} />
          <Loading />
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
    this.props.setBegin(moment(date).format('MM-DD-YYYY HH:mm:ss'))
  }

  handleDatePickedFunctionEnd = (date) => {
    this.props.setEnd(moment(date).format('MM-DD-YYYY HH:mm:ss'))
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
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

export default connect(
  (state) => ({
    init_status: state.initApp.status,
    error: state.initApp.error,
    title: state.inputTaskBox.title,
    description: state.inputTaskBox.description,
    exchangePair: state.inputTaskBox.exchangePair,
    startDate: state.inputTaskBox.startDate,
    endDate: state.inputTaskBox.endDate,
    bids: state.inputTaskBox.bids,
    sell: state.inputTaskBox.sell,
    exchange_times: state.inputTaskBox.exchange_times,
    execute_rate: state.inputTaskBox.execute_rate,
    each_piece: state.inputTaskBox.each_piece
  }),
  (dispatch) => ({
    startInitApp: () => dispatch(initApp.exec()),
    setTitle: (title) => dispatch(inputTaskBox.setTitle(title)),
    setDescription: (description) => dispatch(inputTaskBox.setDescription(description)),
    setExchangePair: (pair) => dispatch(inputTaskBox.setExchangePair(pair)),
    setBegin: (begin_date) => dispatch(inputTaskBox.setBegin(begin_date)),
    setEnd: (end_date) => dispatch(inputTaskBox.setEnd(end_date)),
  })
)(Main);
