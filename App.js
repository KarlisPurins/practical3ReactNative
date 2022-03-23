import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import { Alert, ActivityIndicator, FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from './components/showWeatherButton';
import * as Location from 'expo-location';

export default function App (){
  //const [place, setPlace] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState(null);
  const [country, setCountry] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [description, setDescription] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  function temperatureConverter(valNum) {
  valNum = parseFloat(valNum);
  return valNum-273.15;
  }

  const getPlaceData = async (lat, lon) => {
    var linkAPI = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=26522379884692fd13fb1ddaacf8975c&lang=la';
    try {
      const response = await fetch(linkAPI);
      const json = await response.json();
      console.log(json.name);
      setPlace(json.name);
      setCountry(json.sys.country);
      setTemperature(temperatureConverter(json.main.temp).toFixed(2));
      setPressure(json.main.pressure);
      setHumidity(json.main.humidity);
      console.log(json.weather);
      setDescription(json.weather.description)
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  /*const getWeatherData = () => {
    try {
      fetch('https://reactnative.dev/movies.json')
      .then(response => response.json())
      .then(data => setData(data.movies));
    } catch (error) {
      console.error(error);
    } 
  }*/

  /*const getWeatherData = async () => {
    linkAPI = 'https://reactnative.dev/movies.json';
    try {
      const response = await fetch(linkAPI);
      const json = await response.json();
      return json.movies;
    } catch (error) {
      console.error(error);
    }
  };*/

  useEffect(() => {
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

        var placeJSON = getPlaceData(latitudeJSON, longitudeJSON);
        
      }

  return (
    <View style={styles.containerView}>
      <MapView style={styles.map} />
      <View style={styles.containerButton}>
        <View style={styles.containerButton}>
            <Text style={styles.text}>Place: {place}, {country}</Text>
            <Text style={styles.text}>Latitude: {latitudeJSON}</Text>
            <Text style={styles.text}>Longitude: {longitudeJSON}</Text>
            <Text style={styles.text}>Temp: {temperature} °C</Text>
            <Text style={styles.text}>Pressure: {pressure}</Text>
            <Text style={styles.text}>Humidity: {humidity}</Text>
            <Text style={styles.text}>Description: {description}</Text>     
        <Button />
        </View>
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