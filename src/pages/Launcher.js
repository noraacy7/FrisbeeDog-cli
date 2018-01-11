import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import GestureLocker from '../pages/GestureLocker.js';
import Main from './Main.js';
import FrontPage from './FrontPage.js';

export default class Launcher extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    storage.load({
      key: 'user'
    }).then((user) => {
      console.log(user);
      if (user['verify_login']) {
        this.props.navigator.resetTo({
          name: 'GestureLocker',
          component: GestureLocker
        });
      } else if (user['mnemonic'] != '') {
        this.props.navigator.resetTo({
          name: 'Main',
          component: Main
        });
      } else {
        this.props.navigator.resetTo({
          name: 'FrontPage',
          component: FrontPage
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style={{ width: width, height: height }} source={require('../../assets/images/frontpage.png') }>
        </Image>
      </View>
    )
  }
}

const {width, height} = Dimensions.get('window');
