import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

export default class ControlPanel extends Component {

  render() {
    return(
      <View style={styles.menucontainer}>

      </View>
    )
  }
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  menucontainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
