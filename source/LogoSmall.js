import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

export class LogoSmall extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="thunder-cloud" size={35} color="#026" />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = LogoSmall;
