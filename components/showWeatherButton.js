import * as React from 'react';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';

const showWeatherButton = () => (
  <Button icon="cloud" mode="contained" color="blue" onPress={() => Alert.alert('Button pressed')}>
    Show weather
  </Button>
);

export default showWeatherButton;