
import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Button title="Go to Simulation 1" onPress={() => navigation.navigate('SimulationOne')} />
      <Button title="Go to Simulation 2" onPress={() => navigation.navigate('SimulationTwo')} />
    </View>
  );
}
