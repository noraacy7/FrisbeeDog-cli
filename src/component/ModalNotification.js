import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {
  MKButton,
  setTheme
} from 'react-native-material-kit';
import PropTypes from 'prop-types';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../stylesheet.js';
import * as Theme from './Theme.js';

const RaisedButtonSend = MKButton.coloredButton()
  .withBackgroundColor(Theme.defaultTheme.primaryButtonColor)
  .withStyle({
    margin: 10,
    flex: 1,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 4,
  })
  .build();

setTheme({
  primaryColor: '#3c97e9',
});

export default class ModalNotification extends Component {
  constructor(props) {
    super(props);
      this.state = {
        title: '',
        content: '',
      }
  }

  show(title, content) {
    this.setState({
      title: title,
      content: content
    })
  }

  render() {
    return(
      <View style={styles1.modalContent}>
        <Text>{this.state.title}</Text>
        <Text>{this.state.content}</Text>
      </View>
    )
  }
}

const {width, height} = Dimensions.get('window');
const styles1 = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});

ModalNotification.propTypes = {
  okCallback: PropTypes.func
}

ModalNotification.defaultProps = {
  okCallback() {

  }
}
