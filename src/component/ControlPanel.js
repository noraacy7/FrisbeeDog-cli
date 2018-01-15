import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ListView,
  DeviceEventEmitter,
  Platform
} from 'react-native';
import {
  MKButton
} from 'react-native-material-kit';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../stylesheet.js';
import * as Theme from './Theme.js';
import _ from 'lodash';

const FlatButton = MKButton.flatButton()
  .withShadowAniEnabled(false)
  .withStyle({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 0,
    height: 50,
    borderStyle: 'solid',
    borderColor: Theme.defaultTheme.borderColor,
    borderBottomWidth: 0.5
  })
  .build();

export default class ControlPanel extends Component {

  constructor(props) {
    super(props);
    this.data = [
      {id: 0, text: 'Bitcoin'},
      {id: 1, text: 'Ethereum'},
      {id: 2, text: 'Dash'},
      {id: 3, text: 'Zcash'},
      {id: 4, text: 'Monero'}
    ];
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      selectedIndex: 0,
    }
  }

  render() {
    return(
      <View style={styles1.menucontainer}>
        <View style={styles1.menubox}>
          <FlatButton
            onPress={() => {

            }}>
            <Text pointerEvents="none"
              style={{paddingBottom: 5, color: Theme.defaultTheme.menuTextColor, fontSize: 16, fontWeight: 'normal'}}>
                Settings
            </Text>
            <Icon style={{paddingRight: Platform.OS==='ios' ? 150 : 170, marginBottom: 0}} name='ios-settings-outline' size={30} color='#999' />
          </FlatButton>
        </View>
        <View style={styles1.menubox}>
          <FlatButton
            onPress={() => {

            }}>
            <Text pointerEvents="none"
              style={{paddingBottom: 5, color: Theme.defaultTheme.menuTextColor, fontSize: 16, fontWeight: 'normal'}}>
                Export Private Keys
            </Text>
            <Icon style={{paddingRight: Platform.OS==='ios' ? 149 : 169, marginBottom: 0}} name='ios-key-outline' size={30} color='#999' />
          </FlatButton>
        </View>
        <View style={styles1.menubox}>
          <FlatButton
            onPress={() => {

            }}>
            <Text pointerEvents="none"
              style={{paddingBottom: 5, color: Theme.defaultTheme.menuTextColor, fontSize: 16, fontWeight: 'normal'}}>
                Report Bugs
            </Text>
            <Icon style={{paddingRight: Platform.OS==='ios' ? 148 : 168, marginBottom: 0}} name='ios-bug-outline' size={30} color='#999' />
          </FlatButton>
        </View>
        <View style={styles1.menubox}>
          <FlatButton
            onPress={() => {

            }}>
            <Text pointerEvents="none"
              style={{paddingBottom: 5, color: Theme.defaultTheme.menuTextColor, fontSize: 16, fontWeight: 'normal'}}>
                About This Programme
            </Text>
          </FlatButton>
        </View>
        <View style={styles1.sectionheader}>
          <Text style={{marginLeft: 5, color: Theme.defaultTheme.darkThemeColor, fontSize: 14, fontWeight: 'bold'}}>
              swith exchanges
          </Text>
        </View>
        <ListView style={styles1.listview}
          ref='listview'
          enableEmptySections={true}
          dataSource={this.state.dataSource.cloneWithRows(this.data)}
          renderRow={this.renderRow.bind(this)}
          removeClippedSubviews={false}
        />
      </View>
    )
  }

  renderRow(rowData, sectioID, rowID, highlightRow) {
    var uri = require('../../assets/exchanges/ex_044.png');
    // switch(rowData.text) {
    //   case 'Bitcoin':
    //     uri = require('../../assets/images/icon-48_Bitcoin.png'); break;
    //   case 'Ethereum':
    //     uri = require('../../assets/images/icon-48_Ethereum.png'); break;
    //   case 'Dash':
    //     uri = require('../../assets/images/icon-48_Dash.png'); break;
    //   case 'Zcash':
    //     uri = require('../../assets/images/icon-48_Zcash.png'); break;
    //   case 'Monero':
    //     uri = require('../../assets/images/icon-48_Monero.png'); break;
    // }
    return(
      <TouchableOpacity style={styles1.row} key={rowID} activeOpacity={1} onPress={e => {
        this.handleRowHasChanged(e, rowData)
      }}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Image source={uri} style={{width: 27, height: 27}}/>
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={{marginLeft: 10, color: Theme.defaultTheme.menuTextColor, fontSize: 16}}>{rowData.text}</Text>
            <Text style={{marginLeft: 10, color: Theme.defaultTheme.normalTextColor, fontSize: 10}}>$4,158.53</Text>
          </View>
        </View>
        {
          rowData.id == this.state.selectedIndex ?
          <Icon style={{paddingRight: Platform.OS==='ios' ? 150 : 170, marginBottom: 0}} name='md-checkmark' size={30} color={Theme.defaultTheme.primaryButtonColor} /> : null
        }
      </TouchableOpacity>
    )
  }

  handleRowHasChanged(e, rowData) {
    var array = _.cloneDeep(this.data);
    array[rowData.id].selected = true;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(array),
      selectedIndex: rowData.id,
    });
    setTimeout(() => {
      DeviceEventEmitter.emit("coinchanged", rowData.text);
    }, 100);
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  menucontainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menubox: {
    backgroundColor: 'transparent',
    height: 50,
    width: width,
  },
  sectionheader: {
    backgroundColor: Theme.defaultTheme.borderColor,
    height: 30,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  listview: {
    backgroundColor: 'transparent',
    flex: 1,
    width: width
  },
  row: {
    backgroundColor: 'transparent',
    padding: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Theme.defaultTheme.borderColor,
    borderTopWidth: 0.5
  }
});
