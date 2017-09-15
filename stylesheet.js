import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default styles=StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
