import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
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
import RestoreMyAccount from './RestoreMyAccount.js';

export default class CreateNewAccount extends Component {

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
        <NavigationBar title={'Create New Account'}
          lItemImage='md-arrow-back'
          lItemTappedCallback={this.handleNavBack.bind(this)}/>
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <Text style={styles1.description}>Please write down your Account mnemonic in the exact sequence below. On the next screen you will be asked to re-enter them in order to ensure accuracy.</Text>
          <Text style={styles1.mnemonic}>dynamic midnight lab absorb curve lizard sell expand uniform federal gym frequent</Text>
          <Animatable.View style={[styles1.confirmWnd, {}]}>
            <View style={styles.line}>
              <View style={[styles.line, {flexDirection: 'row', justifyContent: 'space-between', padding: 5}]}>
                <TouchableOpacity>
                  <Text style={styles.boldtext}></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if (this.props.navigator) {
                    this.props.navigator.push({
                      name: 'RestoreMyAccount',
                      component: RestoreMyAccount
                    });
                  }
                }}>
                  <Text style={styles.boldtext}>CONTINUE</Text>
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
  mnemonic: {
    backgroundColor: 'transparent',
    fontSize: 18,
    color: Theme.defaultTheme.importantTextColor,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderStyle: 'solid',
    borderColor: '#999',
    borderWidth: 0.5,
    borderRadius: 4.0
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
