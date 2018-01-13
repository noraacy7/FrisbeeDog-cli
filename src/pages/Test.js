import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import NavigationBar from '../component/NavigationBar.js';
import Modal from 'react-native-modal';
import styles1 from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';
import {
  connect
} from 'react-redux';
import * as counter from '../actions/counter.js';
import Counter from '../component/Counter.js';
import Picker from 'react-native-wheel-picker';

export default class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 2,
      itemList: [
        "ltcbtc",
        "ethbtc",
        "etcbtc",
        "rrtbtc",
        "zecbtc",
        "xmrbtc",
        "dshbtc",
        "xrpbtc",
        "iotbtc",
        "eosbtc",
        "sanbtc",
        "omgbtc",
        "bchbtc",
        "neobtc",
        "etpbtc",
        "qtmbtc"
      ]
    }
  }

  onPickerSelect(index) {
    this.setState({
      selectedItem: index
    })
  }

  render() {
    return (
      <View style={{height: Dimensions.get('window').height}}>
          <Picker style={{backgroundColor: 'red', width: 150, height: 180}}
            selectedValue={this.state.selectedItem}
            itemStyle={{color: "#000", fontSize: 26}}
            onValueChange={(index) => this.onPickerSelect(index)}>
              {this.state.itemList.map((value, i) => (
                <Picker.Item label={value} value={i} key={i}/>
              ))}
            </Picker>
            <Text style={{margin: 20, color: '#ffffff'}}>
    					YOU ARE CHOOSEN：{this.state.itemList[this.state.selectedItem]}
    				</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
