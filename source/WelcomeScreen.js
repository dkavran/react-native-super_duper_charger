import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  BackAndroid,
  TouchableOpacity,
  Alert
} from 'react-native';

import LogoWelcome from './LogoWelcome';

export class WelcomeScreen extends Component {

  navSecond(){
    this.props.navigator.push({
      id: 'SearchScreen'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.sign}>SuperDuperCharge</Text>
        <Text style={styles.extraInfo}>Find a charging station nearby</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={this.navSecond.bind(this)}>
          <View>
            <LogoWelcome/>
          </View>
        </TouchableOpacity>
        <Text style={styles.extraInfo}>Click the lightning cloud to start</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  sign: {
    textAlign: 'center',
    fontSize: 25,
    color: '#026',
    marginBottom: 75
  },

  extraInfo: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 15
  }
});

module.exports = WelcomeScreen;
