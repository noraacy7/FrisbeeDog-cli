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
    }).then((l0calsettings) => {
      console.log(l0calsettings);
      if (l0calsettings['verify_login']) {
        this.props.navigator.resetTo({
          name: 'GestureLocker',
          component: GestureLocker
        });
      } else if (l0calsettings['mnemonic'] != '') {
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
      storage.save({
        key: 'user',
        data: {
          suggestion_of_gesture_hide: false,
          gesture: '',
          verify_login: false,
          mnemonic: '',
          wid: '',
          notifications: []
        }
      });
      this.props.navigator.resetTo({
        name: 'FrontPage',
        component: FrontPage,
        // params: {
        //   mnemonic: 'labor maze tip include illegal solve renew crack truth wage chest walk',
        // }
      });
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
