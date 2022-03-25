import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import Callout from 'react-native-maps';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState(null);
  const [country, setCountry] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [description, setDescription] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    return valNum - 273.15;
  }

  const getPlaceData = async (lat, lon) => {
    var linkAPI =
      'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=26522379884692fd13fb1ddaacf8975c&lang=la';
    try {
      const response = await fetch(linkAPI);
      const json = await response.json();
      setPlace(json.name);
      setCountry(json.sys.country);
      setTemperature(temperatureConverter(json.main.temp).toFixed(2));
      setPressure(json.main.pressure);
      setHumidity(json.main.humidity);
      setDescription(json.weather['0'].description);
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    var text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  getPlaceData(latitude, longitude);

  return (
    <View style={styles.containerView}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MapView
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={styles.map}>
          <MapView.Marker
            style={styles.map}
            title={place + ', ' + country}
            coordinate={{ latitude: latitude, longitude: longitude }}
            pinColor={'#00BFFF'}>
            <MapView.Callout>
              <View style={{ height: 200, width: 250 }}>
                <Text style={styles.text}>Place: {place}, {country}</Text>
                <Text style={styles.text}>Latitude: {latitude}</Text>
                <Text style={styles.text}>Longitude: {longitude}</Text>
                <Text style={styles.text}>Temp: {temperature}°C</Text>
                <Text style={styles.text}>Pressure: {pressure} hPa</Text>
                <Text style={styles.text}>Humidity: {humidity}%</Text>
                <Text style={styles.text}>Description: {description}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 19,
  },
});
