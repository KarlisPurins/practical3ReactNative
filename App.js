import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Dimensions } from 'react-native';
import Button from './components/showWeatherButton';

export default function App (){
  const[isLoading, setLoading] = useState(true);
  const[data, setData] = useState([]);

  /*const getMovies = async () =>{
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

  const getMovies = () => {
    try {
      fetch('https://reactnative.dev/movies.json')
      .then(response => response.json())
      .then(data => setData(data.movies));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.containerView}>
      <MapView style={styles.map} />
      <View style={styles.containerButton}>
      <View style={styles.containerButton}>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
             <Text>{item.title}, {item.releaseYear}</Text>    
          )}
         />
      </View>
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
    right: '10%',
    bottom: '5%',
  }
});