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
  ScrollView
} from 'react-native';

import Map from './Map';

export class ResultInformation extends Component {
  constructor(props) {
    super(props);
    var counterOfStations = 0;
    var fastChargeAvailable = 'Not available';
    for(let i in this.props.data.Connections) {
      counterOfStations++;
      if(this.props.data.Connections[i].Level != null) {
        if(this.props.data.Connections[i].Level.IsFastChargeCapable == true) {
          fastChargeAvailable = 'Available';
        }
      }
    }
    this.state = {
      title: this.props.data.AddressInfo.Title,
      description: this.props.data.AddressInfo.Town + " " + this.props.data.AddressInfo.AddressLine1,
      address: this.props.data.AddressInfo.AddressLine1,
      town: this.props.data.AddressInfo.Town,
      state: this.props.data.AddressInfo.StateOrProvince,
      distance: Math.round(this.props.data.AddressInfo.Distance),
      usageCost: this.props.data.UsageCost,
      telephone: this.props.data.AddressInfo.ContactTelephone1,
      marker: {
        latitude: this.props.data.AddressInfo.Latitude,
        longitude: this.props.data.AddressInfo.Longitude
      },
      mapPosition: {
        latitude: this.props.data.AddressInfo.Latitude,
        longitude: this.props.data.AddressInfo.Longitude,
        latitudeDelta: 0.0272,
        longitudeDelta: 0.0272,
      },
      numberOfChargingStations: counterOfStations,
      fastCharge: fastChargeAvailable
    };
  }

  showInfo() {

  }

  render() {
      return(
          <View style={styles.container}>
            <Text style={styles.title}>{this.state.title}</Text>
            <ScrollView>
            <Map currentRegion={this.state.mapPosition} marker={this.state.marker} title={this.state.title}
                description={this.state.description} currentScreen={this.props.title}/>
              <View style={styles.informationContainer}>
              <View style={styles.information}>
                <Text style={styles.data}>Address</Text>
                <Text style={styles.infoData}>{this.state.address}, {this.state.town}, {this.state.state}</Text>
                <Text style={styles.data}>Usage costs</Text>
                {this.state.usageCost != null &&
                  <Text style={styles.infoData}>{this.state.usageCost}</Text>
                }
                {this.state.usageCost == null &&
                  <Text style={styles.infoData}>Unknown</Text>
                }

                <Text style={styles.data}>Telephone</Text>
                {this.state.telephone != null &&
                  <Text style={styles.infoData}>{this.state.telephone}</Text>
                }
                {this.state.telephone == null &&
                  <Text style={styles.infoData}>Not available</Text>
                }
              </View>
              <View style={styles.distanceInfo}>
                <Text style={styles.distanceNumber}>{this.state.distance} km</Text>
                <Text>Away</Text>
              </View>
            </View>
            <View style={styles.additionalInformation}>
              <Text style={styles.data}>Fast charge</Text>
              <Text style={styles.infoData}>{this.state.fastCharge}</Text>
              <Text style={styles.data}>Number of charging stations</Text>
              <Text style={styles.infoData}>{this.state.numberOfChargingStations}</Text>
            </View>
            </ScrollView>
          </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#026',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center'
  },

  data: {
    fontSize: 15,
    color: '#026',
    marginBottom: 2,
    marginTop: 2
  },

  informationContainer: {
    flexDirection: 'row',
    flex: 1
  },

  information: {
    marginLeft: 10,
    width: 230
  },

  distanceInfo: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  },

  distanceNumber: {
    color: '#026',
    fontSize: 25
  },

  additionalInformation: {
    marginLeft: 10,
    width: 230,
    flexDirection: 'column',
    flex: 1,
    marginBottom: 5
  },

  infoData: {
    fontSize: 13
  }

});

module.exports = ResultInformation;
