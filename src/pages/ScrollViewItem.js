import React, {Component} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode';

export default class ScrollViewItem extends Component {

  render() {
    return(
      <View style={styles.addressbox}>
        <QRCode value={this.props.address.address}
          size={100}
          bgColor='transparent'
          fgColr='white' />
        <View style={styles.addressbox_info}>
          <Text style={[styles.text, {color: '#999'}]}>{this.props.address.address}
            <Text style={{color: '#fff'}}>=</Text>
            <Icon name={'md-copy'} size={18} color='#999' onPress={() => this.onCopy()}/>
            <Text style={{color: '#fff'}}>=</Text>
            <Icon name={'md-refresh'} size={18} color='#999' onPress={() => this.onRefresh()}/>
            <Text style={{color: '#fff'}}>=</Text>
            <Icon name={'md-swap'} size={18} color='#999' onPress={() => this.onTransactionHistory()}/>
          </Text>
          <Text style={[styles.large_text, {marginTop: 10, color: '#000'}]}>
            {this.props.address.balance}
          </Text>
          <Text style={[styles.text, {color: '#999'}]}>
            ≈ <Text style={[styles.text, {color: '#999'}]}>$ 0.000</Text>
          </Text>
        </View>
      </View>
    );
  }

  onCopy() {
    this.props.onCopy();
  }

  onRefresh() {
    this.props.onRefresh();
  }

  onTransactionHistory() {
    this.props.onTransactionHistory();
  }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  addressbox: {
    backgroundColor: 'transparent',
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    width: width - 20,
    height: 120,
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderWidth: 0,
    borderTopWidth: 1.5,
  },
  addressbox_info: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 14,
  },
  large_text: {
    fontSize: 24,
  }
});
