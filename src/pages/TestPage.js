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
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';
import {
  connect
} from 'react-redux';
import * as createNewAccount from '../actions/createNewAccount.js';
import * as counter from '../actions/counter.js';
import Counter from '../component/Counter.js';
import FrontPage from './FrontPage.js';

class TestPage extends Component {

  constructor(props) {
    super(props);

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.status === 'done' && nextProps.result) {
      this.props.navigator.push({
        name: 'FrontPage',
        component: FrontPage
      });
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar title={'Test Page'}
          lItemImage='md-arrow-back'
          lItemTappedCallback={this.handleNavBack.bind(this)}/>
          <Text>Status: {this.props.status}</Text>
          <TouchableOpacity style={styles1.loginBtn} onPress={() => this.props.action1()}>
            <Text>Create New Account</Text>
          </TouchableOpacity>
          <Counter incrementFn={this.props.incrementFn} decrementFn={this.props.decrementFn} count={this.props.count} />
      </View>
    )
  }

  handleNavBack() {
    this.setState({
      visible: false
    });
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  loginBtn: {
    borderWidth: 1,
    padding: 5,
  }
});

export default connect(
  (state) => ({
    status: state.createNewAccount.status,
    result: state.createNewAccount.result,
    user: state.createNewAccount.user,
    count: state.counter.count,
  }),
  (dispatch) => ({
    action1: () => dispatch(createNewAccount.exec()),
    incrementFn: () => dispatch(counter.increment()),
    decrementFn: () => dispatch(counter.decrement())
  })
)(TestPage);
