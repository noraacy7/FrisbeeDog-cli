import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import * as Theme from '../config/Theme.js';

const HEIGHT_STATUSBAR = 20;
const HEIGHT_NAVIGATIONBAR = 50;

export default class NavigationBar extends Component {

  static defaultProps = {
    title: '',
    titleColor: '#fff',
    titleTappedCallback() {

    },
    navbarBackgroundColor: Theme.defaultTheme.themeColor,
    navbarOpacity: 1,
    navbarStyle: 0,
    navbarBorderBottomColor: Theme.defaultTheme.borderColor,
    navbarBorderBottomWidth: 0.8,

    lItemTitle: '',
    lItemTitleColor: 'transparent',
    lItemTappedCallabck() {

    },

    rItemTitle: '',
    rItemTitleColor: 'transparent',
    rItemTappedCallback() {

    }
  };

  static propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    titleView: PropTypes.node,
    titleTappedCallback: PropTypes.func,
    navbarBackgroundColor: PropTypes.string,
    navbarOpacity: PropTypes.number,
    navbarStyle: PropTypes.number,
    navbarBorderBottomColor: PropTypes.string,
    navbarBorderBottomWidth: PropTypes.number,
    lItemTitle: PropTypes.string,
    lItemTitleColor: PropTypes.string,
    lItemImage: PropTypes.node,
    lItemTappedCallabck: PropTypes.func,
    rItemTitle: PropTypes.string,
    rItemTitleColor: PropTypes.string,
    rItemImage: PropTypes.node,
    rItemTappedCallback: PropTypes.func,
  };

  render() {
    var isLImageDisplayed = false;
    if (this.props.lItemImage && this.props.lItemTitle) {
      isLImageDisplayed = true;
    } else if (this.props.lItemImage) {
      isLImageDisplayed = true;
    }

    var isLNothing = false;
    if (this.props.lItemTitle.length <= 0 && !this.props.lItemImage) {
      isLNothing = true;
    }

    var isRImageDisplayed = false;
    if (this.props.rItemImage && this.props.rItemTitle) {
      isRImageDisplayed = true;
    } else if (this.props.rItemImage) {
      isRImageDisplayed = true;
    }

    var isRNothing = false;
    if (this.props.rItemTitle.length <= 0 && !this.props.rItemImage) {
      isRNothing = true;
    }

    var isTitleViewDisplayed = false;
    if (this.props.title && this.props.titleView) {
      isTitleViewDisplayed = true;
    } else if (this.props.titleView) {
      isTitleViewDisplayed = true;
    }

    return (
      <View style={styles.navbarContainer}>
        <View style={[styles.navbar1, {
          backgroundColor: this.props.navbarBackgroundColor,
          height: HEIGHT_STATUSBAR+HEIGHT_NAVIGATIONBAR,
          opacity: this.props.navbarOpacity
        }]}>
          <View style={styles.itemView}>
            {
              !isLNothing ?
              <TouchableOpacity style={styles.lItem} onPress={this.props.lItemTappedCallback}>
                {
                  isLImageDisplayed ?
                  <Icon style={[styles.lItemImage]} name={this.props.lItemImage} size={25} color='#fff' /> :
                  <Text style={[styles.lItemTitle, {color: this.props.lItemTitleColor}]}>
                    {this.props.lItemTitle}
                  </Text>
                }
              </TouchableOpacity> : this.renderLogo()
            }
          </View>
          {
            isTitleViewDisplayed ?
            <TouchableOpacity style={styles.titleView} onPress={this.props.titleTappedCallback}>
              {this.props.titleView}
            </TouchableOpacity> :
            <View style={styles.titleView}>
              <Text style={[styles.title, {color: this.props.titleColor}]}>
                {this.props.title}
              </Text>
            </View>
          }
          <View style={styles.itemView}>
            {
              !isRNothing ?
              <TouchableOpacity style={styles.rItem} onPress={this.props.rItemTappedCallback}>
                {
                  isRImageDisplayed ?
                  <Icon name={this.props.rItemImage} size={25} color='#fff' /> :
                  <Text style={[styles.rItemTitle, {color: this.props.rItemTitleColor}]}>
                    {this.props.rItemTitle}
                  </Text>
                }
              </TouchableOpacity> : null
            }
          </View>
        </View>
        <View style={{height: this.props.navbarBorderBottomWidth, backgroundColor: this.props.navbarBackgroundColor}}></View>
      </View>
    );
  }

  renderLogo() {
    return(
      <TouchableOpacity style={styles.lItem}>
        <Image source={require('../../assets/images/logo.png')}
          style={{width: 145, height: 27}}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  navbarContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    height: 50
  },

  navbar1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  itemView: {
    width: 120,
    justifyContent: 'center',
  },

  lItem: {
    marginLeft: 2,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-start'
  },

  lItemTitle: {
    marginRight: 5,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Cochin',
  },

  lItemImage: {
    margin: 10,
    //resizeMode: 'contain',
  },

  rItem: {
    marginRight: 8,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  rItemTitle: {
    marginRight: 5,
    marginLeft: 5,
    fontSize: 14,
  },

  rItemImage: {
    margin: 10,
    resizeMode: 'contain'
  }
});
