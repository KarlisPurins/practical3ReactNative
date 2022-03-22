import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useState } from 'react/cjs/react.production.min';

export default function App (){
  /*const[isLoading, setLoading] = useState(true);
  const[data, setData] = useState([]);

  const getMovies = async () =>{
    try{
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);

    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }*/
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});