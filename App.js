import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SimulationOne from './screens/SimulationOne';
import SimulationTwo from './screens/SimulationTwo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SimulationOne" component={SimulationOne} />
        <Stack.Screen name="SimulationTwo" component={SimulationTwo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
