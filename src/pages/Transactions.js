import React, { Component } from 'react';
import {
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
import ActionSheet from 'react-native-actionsheet';
import * as Animatable from 'react-native-animatable';
import NavigationBar from '../container/NavigationBar.js';
import ScrollViewItem from './ScrollViewItem.js';
import styles from '../../stylesheet.js';

var addresses = [
  {address: '2N1vKCFx3gF4jYVKfuD9ViuQaHB2ujcbmV9', balance: '0.00000000', updated_time: '2017-09-18 14:28:00'},
  {address: 'mn7yHmxBpV9H5Uatfu8bRpUkqtYsauMsxW', balance: '0.00000000', updated_time: '2017-09-18 14:28:15'},
];

const PlainButton = MKButton.plainFab()
  .withStyle({
    alignSelf: 'center',
  })
  .build();

export default class Transactions extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar title={'Transactions'}
          lItemImage='md-arrow-back'
          lItemTappedCallback={this.handleNavBack.bind(this)}/>
        <View style={styles.container}>
          <ScrollView keyboardDismissMode={'on-drag'}>
            {
              addresses.map((item, i) => {
                return(
                  <ScrollViewItem
                    key={i}
                    address={item}
                    onCopy={() => this.handleCopy(i)}
                    onRefresh={() => this.handleRefresh(i)}
                    onTransactionHistory={() => this.handleTransactionHistory(i)}>
                  </ScrollViewItem>
                )
              })
            }
          </ScrollView>
        </View>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Add another address'}
          options={['Cancel', 'import from my account', 'create address']}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={this.handleActionSheet}
        />
      </View>
    )
  }

  handleNavBack() {
    if (this.props.navigator) {
      this.props.navigator.pop();
    }
  }
}
