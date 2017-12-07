import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import {
  MKButton,
  MKColor,
  MKSpinner
} from 'react-native-material-kit';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import NavigationBar from '../container/NavigationBar.js';
import styles from '../../stylesheet.js';
import * as Theme from '../config/Theme.js';

export default class RestoreMyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar title={'Restore Verification'}
          lItemImage='md-arrow-back'
          lItemTappedCallback={this.handleNavBack.bind(this)}/>
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <Text style={styles1.description}>Please enter the words you just wrote down, one after another, to make sure that everything is backed up correctly.</Text>
          <TextInput style={styles1.inputboxMnemonic}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            multiline={true}
            numberOfLines = {3}
            onChangeText={() => {

            }}
          />
          <Animatable.View style={[styles1.confirmWnd, {}]}>
            <View style={styles.line}>
              <View style={[styles.line, {flexDirection: 'row', justifyContent: 'space-between', padding: 5}]}>
                <TouchableOpacity onPress={() => {

                }}>
                  <Text style={styles.boldtext}>RESET</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {

                }}>
                  <Text style={styles.boldtext}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </View>
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
  description: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: Theme.defaultTheme.normalTextColor,
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  inputboxMnemonic: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: Theme.defaultTheme.importantTextColor,
    width: width - 20,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 30,
    borderStyle: 'solid',
    borderColor: '#999',
    borderWidth: 0.5,
    borderRadius: 4,
  },
  confirmWnd: {
    backgroundColor: Theme.defaultTheme.themeColor,
    opacity: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
});
