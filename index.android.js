/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  StatusBar,
  Alert,
  BackAndroid
} from 'react-native';

import WelcomeScreen from './source/WelcomeScreen';
import SearchScreen from './source/SearchScreen';
import MapList from './source/MapList';
import ResultInformation from './source/ResultInformation';

var _navigator;

export default class SuperDuperCharge extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress',this.onBackPress.bind(this));
  }

  onBackPress() {
      if(_navigator.getCurrentRoutes().length == 1) {
        BackAndroid.exitApp();
        return false;
      }
      _navigator.pop();
      return true;
  }

  render() {
    return (
      <Navigator initialRoute={{id:'WelcomeScreen'}} renderScene={this.navigatorRenderScene.bind(this)}/>
    );
  }

    navigatorRenderScene(route, navigator) {

    _navigator = navigator;

    switch(route.id) {
      case 'WelcomeScreen':
        return (<WelcomeScreen navigator={_navigator} title="first" />);
      case 'SearchScreen':
        return (<SearchScreen navigator={_navigator} title="second" />);
      case 'MapList':
        return (<MapList navigator={_navigator} title="third" data={route.data} />);
      case 'ResultInformation':
        return (<ResultInformation navigator={_navigator} title="forth" data={route.data}/>);
    }
  }
};

AppRegistry.registerComponent('SuperDuperCharge', () => SuperDuperCharge);
