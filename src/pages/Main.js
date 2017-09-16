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
import {
  MKButton,
  MKColor,
  MKSpinner
} from 'react-native-material-kit';
import ActionSheet from 'react-native-actionsheet';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from '../container/NavigationBar.js';
import styles from '../../stylesheet.js';

const FlatButton = MKButton.flatButton()
  .withShadowAniEnabled(false)
  .withStyle({
    flex: 1,
    height: 50,
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderRightWidth: 0.5
  })
  .build();

const RaisedButtonReceive = MKButton.coloredButton()
  .withBackgroundColor('#74c948')
  .withStyle({
    margin: 10,
    flex: 1,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 4,
  })
  .build();

const RaisedButtonSend = MKButton.coloredButton()
  .withBackgroundColor('#3c97e9')
  .withStyle({
    margin: 10,
    flex: 1,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 4,
  })
  .build();

const PlainButton = MKButton.plainFab()
  .withStyle({
    alignSelf: 'center',
  })
  .build();

export default class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout((() => {
      if (this.refs.progBar) {
        this.refs.progBar.progress = 0.6;
      }
    }), 1000);
  }

  handlePressQrScanner() {
    console.log('clicked');
  }

  handleActionSheet(i) {
    console.log(">>>> you select: " + i);
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationBar lItemImage='logo' rItemImage='md-menu' rItemTappedCallback={null} />
        <ScrollView>
          <View style={styles1.infownd}>
            <View style={styles1.upbox}>
              <Image source={require('../../assets/images/green_shield.png')}
                style={{width: 27, height: 27}}/>
              <Text style={styles1.label}>Need an unlock gesture?</Text>
            </View>
            <View style={styles1.downbox}>
              <FlatButton
                onPress={() => {
                  console.log('hi');
                }}>
                <Text pointerEvents="none"
                  style={{color: '#3188c9', fontSize: 16, fontWeight: 'bold'}}>
                    No, thanks
                </Text>
              </FlatButton>
              <FlatButton
                onPress={() => {
                  console.log('hi');
                }}>
                <Text pointerEvents="none"
                  style={{color: '#3188c9', fontSize: 16, fontWeight: 'bold'}}>
                    Go ahead
                </Text>
              </FlatButton>
            </View>
          </View>
          <View style={styles1.sendbox}>
            <View style={styles1.row1}>
              <Text style={styles1.title}>Make Any Transactions</Text>
              <Text style={styles1.description}>input or scan target address:</Text>
            </View>
            <View style={styles1.row1}>
              <TextInput style={styles1.inputbox1}
                placeholder={'Address'}
                onChangeText={() => {

                }}
              />
              <TouchableOpacity style={{position: 'absolute', right: 20, top: 17, backgroundColor: '#fff'}}
                onPress={this.handlePressQrScanner}>
                <Icon name={'md-qr-scanner'} size={25} color='#ddd' />
              </TouchableOpacity>
            </View>
            <View style={styles1.row2}>
              <TextInput style={styles1.inputbox2}
                placeholder={'Amount'}
                onChangeText={() => {

                }}
              />
              <TextInput style={styles1.inputbox2}
                editable={false}
                value={"0.001"}
                onChangeText={() => {

                }}
              />
            </View>
            <View style={styles1.row2}>
              <RaisedButtonReceive
                onPress={() => {
                  console.log('hi');
                }}>
                <Text pointerEvents="none"
                  style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                    Receive
                </Text>
              </RaisedButtonReceive>
              <RaisedButtonSend
                onPress={() => {
                  console.log('hi');
                }}>
                <Text pointerEvents="none"
                  style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                    Send
                </Text>
              </RaisedButtonSend>
            </View>
          </View>
          <PlainButton
            onPress={() => {
              this.ActionSheet.show();
            }}>
            <Image pointerEvents="none" source={require('../../assets/images/plus.png')} />
          </PlainButton>
        </ScrollView>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Add Another Address'}
          options={['Cancel', 'Import From My Account', 'Create New Address']}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={this.handleActionSheet}
        />
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  infownd: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginBottom: 16,
    width: width,
    height: 100,
    flex: 1,
    flexDirection: 'column',
    borderStyle: 'solid',
    borderColor: '#f5f5f5',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  upbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  downbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  label: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999999'
  },
  sendbox: {
    backgroundColor: '#f49422',
    marginTop: 0,
    marginBottom: 16,
    width: width,
    height: 240,
    flex: 1,
    flexDirection: 'column',
  },
  row1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b5b6a'
  },
  description: {
    fontSize: 14,
    color: '#3188c9'
  },
  inputbox1: {
    backgroundColor: '#fff',
    flex: 1,
    width: width - 20,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1.0,
    borderRadius: 4,
  },
  inputbox2: {
    backgroundColor: '#fff',
    flex: 1,
    width: width / 2.0 - 20,
    height: 40,
    margin: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 40,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1.0,
    borderRadius: 4,
  },
});
