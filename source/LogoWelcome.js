import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

export class LogoWelcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="thunder-cloud" size={90} color="#026" />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = LogoWelcome;
