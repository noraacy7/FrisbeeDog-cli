import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './src/container/App';

AppRegistry.registerComponent('Frisbeedog', () => App);




// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   Animated,
//   TouchableHighlight
// } from 'react-native';
// import Animation from 'lottie-react-native';
//
// var MessageBar = require('./src/MessageBar/MessageBar.js');
// var MessageBarManager = require('./src/MessageBar/MessageBarManager.js');
//
// export default class Frisbeedog extends Component {
//
//   constructor(props) {
//       super(props);
//       this.state = {
//         progress: new Animated.Value(0),
//       };
//   }
//
//   componentDidMount() {
//     Animated.timing(this.state.progress, {
//       toValue: 1,
//       duration: 5000,
//     }).start();
//     MessageBarManager.registerMessageBar(this.refs.alert);
//   }
//
//   componentWillUnmount() {
//     MessageBarManager.unregisterMessageBar();
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableHighlight style={styles.buttonContainer} onPress={() => {
//           MessageBarManager.showAlert({
//             message: "hello world",
//             alertType: 'success',
//             viewTopOffset: 20,
//             durationToHide: 50000,
//             messageNumberOfLines: 1,
//             messageStyle: {alignSelf: 'center'}
//           });
//         }}>
//           <Text style={styles.button}>Show Simple Alert</Text>
//         </TouchableHighlight>
//         <Animation
//           style={styles.animFrame}
//           source={require('./animations/TwitterHeart.json')}
//           progress={this.state.progress}
//         />
//         <MessageBar ref="alert" />
//       </View>
//     );
//   }
// }
//
// const {width, height} = Dimensions.get('window');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   animFrame: {
//     width: 200,
//     height: 200
//   },
//   buttonContainer: {
//     alignSelf:'stretch',
//   },
//   button: {
//     alignSelf: 'stretch',
//     textAlign: 'center',
//     backgroundColor: 'blue',
//     color: 'white',
//     padding: 10,
//     margin: 10,
//   }
// });
//
// AppRegistry.registerComponent('Frisbeedog', () => Frisbeedog);
