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
  StatusBar
} from 'react-native';

import WelcomeScreen from './source/WelcomeScreen';
import SearchScreen from './source/SearchScreen';
import MapList from './source/MapList';
import ResultInformation from './source/ResultInformation';

var _navigator;

export default class testProject extends Component {
  render() {
    return (
      <Navigator initialRoute={{id:'WelcomeScreen'}} renderScene={this.navigatorRenderScene.bind(this)}/>
    );
  }

    navigatorRenderScene(route, navigator) {

    _navigator = navigator;

    switch(route.id) {
      case 'WelcomeScreen':
        return (<WelcomeScreen navigator={navigator} title="first" />);
      case 'SearchScreen':
        return (<SearchScreen navigator={navigator} title="second" />);
      case 'MapList':
        return (<MapList navigator={navigator} title="third" data={route.data} />);
      case 'ResultInformation':
        return (<ResultInformation navigator={navigator} title="forth" data={route.data}/>);
    }
  }
};

AppRegistry.registerComponent('testProject', () => testProject);
