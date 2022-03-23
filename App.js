import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import { Alert, ActivityIndicator, FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from './components/showWeatherButton';
import * as Location from 'expo-location';

export default function App (){
  const[isLoading, setLoading] = useState(true);
  const[data, setData] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  /*const getWeatherData = () => {
    try {
      fetch('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}')
      .then(response => response.json())
      .then(data => setData(data.movies));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }*/

  useEffect(() => {
    //getWeatherData();
    (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

      var text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
        var timestampJSON = location['timestamp'];
        var latitudeJSON = location.coords.latitude;
        var longitudeJSON = location.coords.longitude;
      }

  return (
    <View style={styles.containerView}>
      <MapView style={styles.map} />
      <View style={styles.containerButton}>
        <Text style={styles.text}>Place: {}</Text>
        <Text style={styles.text}>Latitude: {latitude}</Text>
        <Text style={styles.text}>Longitude: {longitude}</Text>
        <Text style={styles.text}>Temp: {}</Text>
        <Text style={styles.text}>Pressure: {}</Text>
        <Text style={styles.text}>Humidity: {}</Text>
        <Text style={styles.text}>Description: {}</Text>
      <FlatList
         //data={data}
         // keyExtractor={({ id }, index) => id}
          //renderItem={({ item }) => (
            // <Text style={styles.text}>{text}</Text>    
         // )}
         />
        <Button />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  containerButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    right: '0%',
    bottom: '0%',
  },
  text: {
    fontSize: 17
  }
});