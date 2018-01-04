import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Counter extends Component {

  static propTypes = {
    incrementFn: PropTypes.func.isRequired,
    decrementFn: PropTypes.func.isRequired
  }

  render() {
    console.log('counter >>>');
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.decrementFn()}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{this.props.count}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => this.props.incrementFn()}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  label: {
    width: 40,
    textAlign: 'center'
  },
  btn: {
    borderWidth: 1,
    padding: 5,
  }
})
