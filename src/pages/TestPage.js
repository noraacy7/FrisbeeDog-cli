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
  MKSlider,
  MKRangeSlider,
  setTheme
} from 'react-native-material-kit';
import NavigationBar from '../container/NavigationBar.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';
import moment from 'moment';


setTheme({
  primaryColor: '#3c97e9',
});

class ValueText extends Component {
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
      <Text>
        {this.state.curValue} ({this.props.rangeText})
      </Text>
    );
  }
}

export default class TestPage extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {

    return(
      <View style={{flex: 1}}>
        <NavigationBar title={'Test Page'}
          lItemImage='md-arrow-back'
          lItemTappedCallback={this.handleNavBack.bind(this)}/>
        <MKRangeSlider
          ref="rangeSlider"
          min={0}
          max={1000000}
          minValue={200000}
          maxValue={500000}
          style={styles1.slider}
          onChange={(curValue) => this.refs.rangeValueText.onChange((curValue.min/10000.0).toFixed(4) + '-' + (curValue.max/10000.0).toFixed(4))}
          />
        <ValueText ref="rangeValueText" initial="20.00-75.00" rangeText="10~100" />
      </View>
    )
  }

  handleNavBack() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  slider: {
    width: width,
  },
});
