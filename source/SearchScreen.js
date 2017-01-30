import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Slider,
  BackAndroid,
  ToastAndroid,
  View,
  TouchableHighlight,
  Animated,
  Alert
} from 'react-native';

import MapView from 'react-native-maps';

import LogoSmall from './LogoSmall';
import Map from './Map';

import Button from 'react-native-button';

var locations = [];
var nearestLocation = null;
var counter = 0;

const onButtonPress = () => {
  console.log("Search pressed");
};

export class SearchScreen extends Component {

  constructor() {
    super();
    this.state= {
      sliderValue: 1,
      loadingText: '',
      closestChargingStationAddress: '',
      closestChargingStationTown: '',
      closestChargingStationState: '',
      fadeAnim: new Animated.Value(1),
      initialPosition: 'unknown',
      lastPosition: '',
      currentLatitude: '',
      currentLongitude: '',
      results: 0,
      marker: {
        latitude: 0,
        longitude: 0
      },
      currentRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0372,
        longitudeDelta: 0.0372,
      },
      data: 0,
      justify: 'center'
    };
  }

  searchNearest(array) {
    var itemCounter = 0;
    for(let item in array) {
      itemCounter++;
      if(counter==0) {
        nearestLocation = array[item];
        counter=1;
      }
      else if(array[item].AddressInfo.Distance < nearestLocation.AddressInfo.Distance) {
        nearestLocation = array[item];
      }
    }
    counter = 0;
    if(itemCounter == 0) {
      this.setState({ loadingText: "No results - Done searching",
      closestChargingStationState: "",
      closestChargingStationTown: "", closestChargingStationAddress: "No results found",
      results: 0,
      justify: 'center'
      });
    }
    else {
      this.setState({
        loadingText: "Done searching",
        closestChargingStationState: nearestLocation.AddressInfo.StateOrProvince,
          closestChargingStationTown: nearestLocation.AddressInfo.Town, closestChargingStationAddress: nearestLocation.AddressInfo.AddressLine1,
          marker: {
            latitude: nearestLocation.AddressInfo.Latitude,
            longitude: nearestLocation.AddressInfo.Longitude
          },
          currentRegion: {
            latitude: nearestLocation.AddressInfo.Latitude,
            longitude: nearestLocation.AddressInfo.Longitude,
            latitudeDelta: 0.0272,
            longitudeDelta: 0.0272
          },
          results: 1,
          data: nearestLocation,
          justify: 'flex-start'
      })
    }
    Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 0,
        duration: 2000}            // Configuration
     ).start();
  }

  initiateFetching() {
    this.setState({ loadingText: "Searching...", fadeAnim: new Animated.Value(1) });
    fetch("http://api.openchargemap.io/v2/poi/?output=json&countrycode=US&maxresults=20&latitude="+ this.state.currentLatitude+"&longitude="+ this.state.currentLongitude+"&distance=" + this.state.sliderValue)
      .then((response) => {
        return response.json();
      })
      .then((responseResults) => {
         locations = responseResults;
         this.searchNearest(locations);
      });
  }

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
      var lastPositionObject = JSON.parse(lastPosition);
      this.setState({currentLatitude: lastPositionObject.coords.latitude,
        currentLongitude: lastPositionObject.coords.longitude});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  seeMoreClick() {
    this.props.navigator.push({
      id: 'MapList',
      data: locations
    })
  }

  moreResultsPress(){
    console.log("pressed button");
  }

  render() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
        try {
            this.props.navigator.pop();
            return true;
        }
        catch (err) {
            return true;
        }
    });
      return (
        <View
          style={{flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#F5FCFF',
          justifyContent: this.state.justify}}>

          <View style={styles.sliderContainer}>
          {this.state.results == 0 &&
            <Text style={styles.instructions}>Lets help you find a charging station nearby</Text>
          }
            <Text style={styles.instructionsSecond}>Set your available range in electric car</Text>
            <Slider style={styles.slider} minimumValue={1} maximumValue={50} step={1}
                {...this.props} onValueChange={(value) => this.setState({sliderValue: value})} onSlidingComplete={this.initiateFetching.bind(this)} />
            <Text>{this.state.sliderValue} km</Text>
          </View>
          {this.state.results == 1 &&
            <View>
              <Text style={styles.closestStation}>{this.state.data.AddressInfo.Title}</Text>
              <Text style={styles.info}>Click the map for more information</Text>
              <Map currentRegion={this.state.currentRegion} marker={this.state.marker} title={this.state.closestChargingStationAddress}
                description={this.state.closestChargingStationTown + " " + this.state.closestChargingStationState}
                data={this.state.data} navigator={this.props.navigator} currentScreen={this.props.title}/>
            </View>}

          <Animated.View style={{paddingTop: 20, opacity: this.state.fadeAnim}}>
          <Text>{this.state.loadingText}</Text>
          </Animated.View>
          {this.state.results == 0 &&
            <LogoSmall/>
          }
          {this.state.results == 1 &&
            <Button
            containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:8, backgroundColor: 'white'}}
              style={{fontSize: 15, color: '#026'}}
                onPress={this.seeMoreClick.bind(this)}>
                More results
              </Button>
          }
        </View>
      );

  }
}


const styles = StyleSheet.create({
  slider: {
    height: 10,
    width: 250,
    marginTop: 10,
    marginBottom: 10
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  sliderContainer: {
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center'
  },

  searchStart: {
    marginTop: 15,
  },

  stationInformation: {
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },

  searchButton: {
    fontWeight: 'bold',
    color: '#026'
  },

  mapContainer: {
   marginTop: 15,
   height: 350,
   width: 360
  },

  map: {
    ...StyleSheet.absoluteFillObject
  },

  seeMoreStart: {
    marginTop: 5,
  },

  seeMore: {
    fontWeight: 'bold',
    color: '#026'
  },

  closestStation: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#026',
    fontSize: 20,
    textAlign: 'center'
  },

  info: {
    marginTop: 5,
    textAlign: 'center'
  },

  instructions: {
    marginBottom: 50,
    textAlign: 'center',
    width: 220,
  },

  instructionsSecond: {
    marginBottom: 10,
    textAlign: 'center'
  }
});

module.exports = SearchScreen;
