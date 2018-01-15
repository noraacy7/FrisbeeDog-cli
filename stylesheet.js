import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as Theme from './src/component/Theme.js';

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
  infoWnd: {
    backgroundColor: Theme.defaultTheme.infoWndColor,
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
  suggestionBox1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Theme.defaultTheme.borderColor,
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  suggestionText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#999'
  },
  suggestionBox2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Theme.defaultTheme.borderColor,
    borderWidth: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  confirmWnd: {
    backgroundColor: '#FCBA42',
    opacity: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 250,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  line: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 50,
    borderColor: Theme.defaultTheme.borderColor,
    borderStyle: 'solid',
    borderBottomWidth: 1.0,
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  },
  smalltext: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#fff'
  },
  boldtext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});
