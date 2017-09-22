import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';
import {StackNavigatior} from 'react-navigation';
import Main from '../pages/Main.js';

export default class FrisbeedogApp extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      return(
        <View style={styles.bg}>
          <Navigator
            initialRoute={{name: 'Main', component: Main}}
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return (
                <Component {...this.props} {...route.params} navigator={navigator} />
              );
            }}
          />
        </View>
      );
    }
}

const {width, height} = Dimensions.get('window');
const styles=StyleSheet.create({

  bg: {
    backgroundColor: 'transparent',
    flex: 1,
    width: width,
    height: height
  },
});
