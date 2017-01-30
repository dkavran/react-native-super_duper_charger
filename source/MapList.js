import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Alert,
  StatusBar,
  TouchableOpacity
} from 'react-native';



export class MapList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.data || [])
    };
  }

  selectedRow(index) {
    this.props.navigator.push({
      id: 'ResultInformation',
      data: this.props.data[index]
    })
  };

  render() {
    return (
      <View style={styles.outsideContainer}>
        <Text style={styles.header}>Charging stations list</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData,sectionID,rowID) => {
              var rows = [];
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={this.selectedRow.bind(this,rowID)}>
                  <View style={styles.container}>
                    <View style={styles.infoContainer}>
                      <Text style={styles.title}>{rowData.AddressInfo.Title}</Text>
                      <Text>{rowData.AddressInfo.AddressLine1}</Text>
                      <Text>{rowData.AddressInfo.Town}, {rowData.AddressInfo.StateOrProvince}</Text>
                      </View>
                      <View style={styles.distanceContainer}>
                        <Text style={styles.distance}>{Math.round(rowData.AddressInfo.Distance)} km</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
          }
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10
  },
  infoContainer: {
    width: 180,
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bold',
    color: '#026',
    fontSize: 14
  },
  distance: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  },

  distanceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 18
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#026',
    textAlign: 'center',
    marginBottom: 5
  }
});


module.exports = MapList;
