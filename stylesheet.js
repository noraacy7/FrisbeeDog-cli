import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default styles=StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    marginTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    width: width,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addressbox: {
    backgroundColor: 'transparent',
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: width - 20,
    height: 120,
    flex: 1,
    flexDirection: 'column',
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    borderWidth: 0,
    borderTopWidth: 0.5,
  }
});
