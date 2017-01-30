import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Slider,
  BackAndroid,
  ToastAndroid,
  View,
  Button,
  TouchableHighlight,
  Animated,
  Alert
} from 'react-native';

import MapView from 'react-native-maps';

export class Map extends Component {
  showInfo() {
    if(this.props.currentScreen != "forth") {
      this.props.navigator.push({
        id: 'ResultInformation',
        data: this.props.data
      })
    }
  }

  render() {
      return(
        <View style={styles.mapContainer}>
          <MapView style={styles.map}
            region={this.props.currentRegion}
            onPress={this.showInfo.bind(this)}>
            <MapView.Marker
              title={this.props.title}
              description={this.props.description}
              coordinate={this.props.marker}
            />
          </MapView>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 15,
    height: 300,
    width: 360
  },

  map: {
    ...StyleSheet.absoluteFillObject
  }
});

module.exports = Map;
