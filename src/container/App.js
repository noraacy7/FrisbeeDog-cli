import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';
import codePush from 'react-native-code-push';
import Storage from 'react-native-storage';
import DeviceInfo from 'react-native-device-info';
import FrontPage from '../pages/FrontPage.js';
import RestoreMyAccount from '../pages/RestoreMyAccount.js';
import CreateNewAccount from '../pages/CreateNewAccount.js';
import Main from '../pages/Main.js';

var storage = new Storage({
  // maximum capcity, default 1000
  size: 200,

  // use AsyncStorage for RN, or window.localStorage for web
  // if not set, data would be lost after reload
  storageBackend: AsyncStorage,

  // expire time, default 1 day(1000*3600*24 millionseconds)
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory, default is true
  enableCache: true,

  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return
  // the latest data.
  sync: {

  }
});

global.storage = storage;

storage.load({
  key: 'l0calsettings'
}).then((settings) => {
  console.log(settings);

  if (settings['unique_id'] == undefined) {
    saveL0calsettingsAsDefault();
  }
}).catch((err) => {
  saveL0calsettingsAsDefault();
});
// setup default value for variables
storage.save({
  key: 'user',
  data: {
    verify_login: false
  }
});

function saveL0calsettingsAsDefault() {
  storage.save({
    key: 'l0calsettings',
    data: {
      suggestion_of_gesture_hide: false,
      gesture: '',
      unique_id: DeviceInfo.getUniqueID(),
    }
  });
}

export default class FrisbeedogApp extends Component {

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      codePush.sync();
      AppState.addEventListener("change", (newState) => {
        newState === "active" && codePush.sync();
      });
    }

    render() {
      return(
        <View style={styles.bg}>
          <Navigator
            initialRoute={{name: 'CreateNewAccount', component: CreateNewAccount}}
            //initialRoute={{name: 'Main', component: Main}}
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
