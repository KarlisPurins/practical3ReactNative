import * as React from 'react';
import { Button } from 'react-native-paper';

const showWeatherButton = () => (
  <Button icon="cloud" mode="contained" color="blue" onPress={() => console.log('Show weather')}>
    Show weather
  </Button>
);

export default showWeatherButton;