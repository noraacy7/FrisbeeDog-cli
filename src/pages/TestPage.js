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
import {
  DatePickerDialog
} from 'react-native-datepicker-dialog';
import NavigationBar from '../container/NavigationBar.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';
import moment from 'moment';

export default class TestPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      StartDateText: '',
      StartDateHolder: null
    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar title={'Test Page'}
          lItemImage='md-arrow-back'
          lItemTappedCallback={this.handleNavBack.bind(this)}/>
          <Text style={styles1.content}>
            React Native Date Picker Dialog Example
          </Text>
          <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)}>
            <View style={styles1.datePickerBox}>
              <Text style={styles1.datePickerText}>{this.state.StartDateText}</Text>
            </View>
          </TouchableOpacity>
          <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
      </View>
    )
  }

  handleNavBack() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }

  DatePickerMainFunctionCall = () => {
    let DateHolder = this.state.StartDateHolder;
    if (!DateHolder || DateHolder == null) {
      DateHolder = new Date();
      //DateHolder.setDate(DateHolder.getDate()+1);
      this.setState({
        StartDateHolder: DateHolder
      });
    }
    //To open the dialog
    this.refs.DatePickerDialog.open({
      date: DateHolder,
      minDate: DateHolder
    });
  }

  onDatePickedFunction = (date) => {
    this.setState({
      StartDateText: moment(date).format('DD-MM-YYYY')
    });
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  content: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  datePickerBox: {
    marginTop: 9,
    borderColor: '#FF5722',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent: 'center'
  },
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000'
  }
});
