import React, {Component} from 'react';
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
  setTheme
} from 'react-native-material-kit';
import {
  DatePickerDialog
} from 'react-native-datepicker-dialog';
import {
  Dropdown
} from 'react-native-material-dropdown';
import PropTypes from 'prop-types';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import styles from '../../stylesheet.js';
import * as Theme from './Theme.js';
import {
  connect
} from 'react-redux';
import * as inputTaskBox from '../actions/inputTaskBox.js';

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

class TaskBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownMenu1: [{value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'}, {value: '8'}, {value: '9'}, {value: '10'}],
      dropdownMenu2: [{value: '1 mins'}, {value: '2 mins'}, {value: '3 mins'}, {value: '5 mins'}],
      dropdownMenu3: [{value: '10%'}, {value: '25%'}, {value: '50%'}, {value: '100%'}],
    };
  }

  render() {
    return(
      <View style={styles1.taskWnd}>
        <View style={styles1.row1}>
          <Text style={styles1.title}>{this.props.title}</Text>
          <Text style={styles1.description}>{this.props.description}</Text>
        </View>
        <View style={styles1.row1}>
          <TextInput style={styles1.inputbox1}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={false}
            numberOfLines = {1}
            editable={false}
            value={this.props.exchangePair}
          />
          <TouchableOpacity style={{position: 'absolute', right: 20, top: 12, backgroundColor: '#fff'}} onPress={this.props.chooseExchangePairCallback}>
            <Icon name={'md-search'} size={25} color='#ddd' />
          </TouchableOpacity>
        </View>
        <View style={[styles1.row2]}>
          <View style={[styles1.whiteFrame, {width: width / 2.0 - 20, height: 60, flexDirection: 'row', marginRight: 4}]}>
            <TouchableOpacity activeOpacity={1} onPress={this.props.chooseBeginDateCallback}>
              <View style={[styles1.itemView, {backgroundColor: 'transparent', flexDirection: 'column'}]}>
                <Text style={[styles1.description, {fontSize: 12, color: '#949494'}]}>Begin Task</Text>
                <TextInput style={styles1.inputbox2}
                  underlineColorAndroid='transparent'
                  autoCorrect={false}
                  multiline={false}
                  numberOfLines = {1}
                  editable={false}
                  value={this.props.startDate} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles1.whiteFrame, {width: width / 2.0 - 20, height: 60, flexDirection: 'row', marginLeft: 4}]}>
            <TouchableOpacity activeOpacity={1} onPress={this.props.chooseEndDateCallback}>
              <View style={[styles1.itemView, {backgroundColor: 'transparent', flexDirection: 'column'}]}>
                <Text style={[styles1.description, {fontSize: 12, color: '#949494'}]}>End Task</Text>
                <TextInput style={styles1.inputbox2}
                  underlineColorAndroid='transparent'
                  autoCorrect={false}
                  multiline={false}
                  numberOfLines = {1}
                  editable={false}
                  value={this.props.endDate} />
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
                value={this.props.bids}
                keyboardType='number-pad'
                onChange={(event) => {
                  this.props.setBids(event.nativeEvent.text)
                }}
              />
            </View>
            <View style={[styles1.itemView, {backgroundColor: 'transparent', marginLeft: 35}]}>
              <Text style={[styles1.description, {fontSize: 12, color: '#949494'}]}>Sell Price</Text>
              <TextInput style={styles1.inputbox3}
                underlineColorAndroid='transparent'
                autoCorrect={false}
                multiline={false}
                numberOfLines = {1}
                value={this.props.sell}
                keyboardType='number-pad'
                onChange={(event) => {
                  this.props.setSell(event.nativeEvent.text)
                }}
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
                value={this.props.exchange_times}
                textColor={'#3b5b6a'}
                selectedItemColor={'#3b5b6a'}
                data={this.state.dropdownMenu1}
                onChangeText={(value, index, data) => {
                  this.props.setExchangeTimes(value)
                }} />
            </View>
            <View style={[styles1.itemView, {backgroundColor: 'transparent'}]}>
              <Dropdown
                label='Execute Rate'
                animationDuration={0}
                value={this.props.execute_rate}
                textColor={'#3b5b6a'}
                selectedItemColor={'#3b5b6a'}
                data={this.state.dropdownMenu2}
                onChangeText={(value, index, data) => {
                  this.props.setExecuteRate(value)
                }} />
            </View>
            <View style={[styles1.itemView, {backgroundColor: 'transparent'}]}>
              <Dropdown
                label='Each Piece'
                animationDuration={0}
                value={this.props.each_piece}
                textColor={'#3b5b6a'}
                selectedItemColor={'#3b5b6a'}
                data={this.state.dropdownMenu3}
                onChangeText={(value, index, data) => {
                  this.props.setEachPiece(value)
                }} />
            </View>
          </View>
        </View>
        <View style={[styles1.row2, {height: 60}]}>
          <RaisedButtonSend onPress={this.props.sendCallback}>
            <Text pointerEvents="none"
              style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Submit
            </Text>
          </RaisedButtonSend>
        </View>
      </View>
    )
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
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
    fontSize: 20,
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
  }
});

TaskBox.propTypes = {
  chooseExchangePairCallback: PropTypes.func,
  chooseBeginDateCallback: PropTypes.func,
  chooseEndDateCallback: PropTypes.func,
  sendCallback: PropTypes.func
};

TaskBox.defaultProps = {
  chooseExchangePairCallback() {

  },
  chooseBeginDateCallback() {

  },
  chooseEndDateCallback() {

  },
  sendCallback() {

  }
};

export default connect(
  (state) => ({
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
    setBids: (price) => dispatch(inputTaskBox.setBids(price)),
    setSell: (price) => dispatch(inputTaskBox.setSell(price)),
    setExchangeTimes: (exchange_times) => dispatch(inputTaskBox.setExchangeTimes(exchange_times)),
    setExecuteRate: (execute_rate) => dispatch(inputTaskBox.setExecuteRate(execute_rate)),
    setEachPiece: (each_piece) => dispatch(inputTaskBox.setEachPiece(each_piece))
  })
)(TaskBox);
